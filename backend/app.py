"""
Flask REST API for Rainfall Prediction
Serves the ML model via HTTP endpoints.
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from core.model import RainfallPredictor
from core.database import db, init_db, PredictionHistory
from core.pdf_generator import generate_prediction_pdf
import logging
import os
from pathlib import Path
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Configure CORS to allow requests from React frontend
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:8080", "http://localhost:5173", "*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Initialize Database
init_db(app)

# Initialize the prediction model
try:
    predictor = RainfallPredictor()
    logger.info("✓ Rainfall prediction model initialized successfully")
except Exception as e:
    logger.error(f"✗ Failed to initialize model: {str(e)}")
    predictor = None

@app.route('/api/health', methods=['GET'])
def health_check():
    if predictor is None:
        return jsonify({'status': 'unhealthy', 'message': 'Model not initialized'}), 503
    return jsonify({'status': 'healthy', 'message': 'API is running', 'version': '2.0.0'}), 200

@app.route('/api/subdivisions', methods=['GET'])
def get_subdivisions():
    try:
        if predictor is None:
            return jsonify({'error': 'Model not initialized'}), 503
        subdivisions = predictor.get_subdivisions()
        return jsonify({'subdivisions': subdivisions, 'count': len(subdivisions)}), 200
    except Exception as e:
        logger.error(f"Error getting subdivisions: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict', methods=['POST', 'OPTIONS'])
def predict_rainfall():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        if predictor is None:
            return jsonify({'error': 'Model not initialized'}), 503
        
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
            
        subdivision = data.get('subdivision')
        year = data.get('year')
        
        if not subdivision or not year:
            return jsonify({'error': 'subdivision and year are required'}), 400
            
        try:
            year = int(year)
        except ValueError:
            return jsonify({'error': 'year must be a valid integer'}), 400
            
        is_valid, error_msg = predictor.validate_input(subdivision, year)
        if not is_valid:
            return jsonify({'error': error_msg}), 400
            
        logger.info(f"Making prediction for {subdivision}, year {year}")
        prediction = predictor.predict(subdivision, year)
        
        # Save to History
        history_entry = PredictionHistory(
            subdivision=subdivision,
            year=year,
            predicted_annual=prediction['predictedAnnual'],
            predicted_monsoon=prediction['predictedMonsoon'],
            confidence=prediction['confidence']
        )
        db.session.add(history_entry)
        db.session.commit()
        
        # Inject the ID back to frontend so they can download PDF by ID if desired
        prediction['history_id'] = history_entry.id
        
        logger.info(f"✓ Prediction successful: {prediction['predictedAnnual']}mm")
        return jsonify(prediction), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """Retrieve all past predictions"""
    try:
        history = PredictionHistory.query.order_by(PredictionHistory.created_at.desc()).limit(50).all()
        return jsonify([h.to_dict() for h in history]), 200
    except Exception as e:
        logger.error(f"History error: {str(e)}")
        return jsonify({'error': 'Failed to fetch history'}), 500

@app.route('/api/export-pdf', methods=['POST'])
def export_pdf():
    """Generate and return a PDF report"""
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Prediction data required'}), 400
        
    try:
        # Create a temp directory for PDFs
        temp_dir = Path(app.instance_path) / 'pdfs'
        os.makedirs(temp_dir, exist_ok=True)
        pdf_path = temp_dir / f"rainfall_report_{int(datetime.utcnow().timestamp())}.pdf"
        
        generate_prediction_pdf(data, str(pdf_path))
        
        return send_file(
            pdf_path, 
            as_attachment=True, 
            download_name=f"Rainfall_Report_{data['metadata']['year']}.pdf",
            mimetype='application/pdf'
        )
    except Exception as e:
        logger.error(f"PDF Gen error: {str(e)}")
        return jsonify({'error': 'Failed to generate PDF'}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🌧️  Rainfall Prediction API Server v2.0")
    print("="*60)
    print("📍 Server running on: http://localhost:5000")
    print("📊 Validating DB Constraints...")
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)
