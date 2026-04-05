"""
Rainfall Prediction Model
Implements the ML model for predicting rainfall based on historical data.
"""

import numpy as np
import joblib
from pathlib import Path
from .data_processor import RainfallDataProcessor

class RainfallPredictor:
    """
    Rainfall prediction model using RandomForestRegressor.
    """
    
    def __init__(self):
        """Initialize the predictor with data processor and load ML model."""
        self.processor = RainfallDataProcessor()
        self.processor.clean_data()
        
        self.model_dir = Path(__file__).parent.parent / 'models'
        self.model_path = self.model_dir / 'rf_model.joblib'
        self.encoder_path = self.model_dir / 'label_encoder.joblib'
        
        self.model = None
        self.encoder = None
        
        self._load_model()
        
    def _load_model(self):
        if self.model_path.exists() and self.encoder_path.exists():
            self.model = joblib.load(self.model_path)
            self.encoder = joblib.load(self.encoder_path)
            print("✓ Loaded RandomForestRegressor model successfully!")
        else:
            print("⚠ ML Model not found. Will fallback to statistical approach.")
            
    def predict(self, subdivision, year):
        """
        Predict rainfall for a given subdivision and year.
        """
        # If model is loaded, use it
        if self.model and self.encoder:
            try:
                sub_encoded = self.encoder.transform([subdivision])[0]
                features = np.array([[sub_encoded, year]])
                
                # Predict [ANNUAL, Jun-Sep, Jan-Feb, Mar-May, Oct-Dec]
                prediction = self.model.predict(features)[0]
                
                predicted_annual = max(0, prediction[0])
                predicted_monsoon = max(0, prediction[1])
                pred_jan_feb = max(0, prediction[2])
                pred_mar_may = max(0, prediction[3])
                pred_oct_dec = max(0, prediction[4])
                
                # Baseline confidence for ML model
                confidence = 90.0
                
                seasonal_data = [
                    {"season": "Jan-Feb (Winter)", "rainfall": round(pred_jan_feb, 1)},
                    {"season": "Mar-May (Pre-Monsoon)", "rainfall": round(pred_mar_may, 1)},
                    {"season": "Jun-Sep (Monsoon)", "rainfall": round(predicted_monsoon, 1)},
                    {"season": "Oct-Dec (Post-Monsoon)", "rainfall": round(pred_oct_dec, 1)}
                ]
                
                historical = self.processor.get_historical_average(subdivision)
                annual_baseline = round(historical['annual_avg'], 1) if historical else None
                monsoon_baseline = round(historical['monsoon_avg'], 1) if historical else None
                anomaly = round(predicted_annual - annual_baseline, 1) if historical else None

                return {
                    'predictedAnnual': round(predicted_annual, 1),
                    'predictedMonsoon': round(predicted_monsoon, 1),
                    'confidence': round(confidence, 1),
                    'seasonalData': seasonal_data,
                    'historicalAnnualAvg': annual_baseline,
                    'historicalMonsoonAvg': monsoon_baseline,
                    'anomalyAnnual': anomaly,
                    'metadata': {
                        'subdivision': subdivision,
                        'year': year,
                        'model': 'RandomForestRegressor'
                    }
                }
            except Exception as e:
                print(f"Prediction failed with ML model: {e}. Falling back to stats.")
        
        # Fallback to statistical approach
        historical = self.processor.get_historical_average(subdivision)
        if historical is None:
            raise ValueError(f"No data available for subdivision: {subdivision}")
            
        recent_data = self.processor.get_subdivision_data(subdivision)
        if len(recent_data) > 10:
            recent_avg = recent_data.tail(10)['ANNUAL'].mean()
            overall_avg = historical['annual_avg']
            trend_factor = recent_avg / overall_avg if overall_avg > 0 else 1.0
        else:
            trend_factor = 1.0
            
        variation = np.random.uniform(0.95, 1.05)
        predicted_annual = historical['annual_avg'] * trend_factor * variation
        predicted_monsoon = historical['monsoon_avg'] * trend_factor * variation
        
        seasonal_data = [
            {"season": "Jan-Feb (Winter)", "rainfall": round(historical['winter_avg'] * trend_factor * variation, 1)},
            {"season": "Mar-May (Pre-Monsoon)", "rainfall": round(historical['pre_monsoon_avg'] * trend_factor * variation, 1)},
            {"season": "Jun-Sep (Monsoon)", "rainfall": round(predicted_monsoon, 1)},
            {"season": "Oct-Dec (Post-Monsoon)", "rainfall": round(historical['post_monsoon_avg'] * trend_factor * variation, 1)}
        ]
        
        base_confidence = 80.0
        annual_baseline = round(historical['annual_avg'], 1)
        monsoon_baseline = round(historical['monsoon_avg'], 1)
        anomaly = round(predicted_annual - annual_baseline, 1)

        return {
            'predictedAnnual': round(predicted_annual, 1),
            'predictedMonsoon': round(predicted_monsoon, 1),
            'confidence': round(base_confidence, 1),
            'seasonalData': seasonal_data,
            'historicalAnnualAvg': annual_baseline,
            'historicalMonsoonAvg': monsoon_baseline,
            'anomalyAnnual': anomaly,
            'metadata': {
                'subdivision': subdivision,
                'year': year,
                'model': 'Statistical Fallback'
            }
        }
    
    def get_subdivisions(self):
        return self.processor.get_available_subdivisions()
    
    def validate_input(self, subdivision, year):
        available_subdivisions = self.get_subdivisions()
        if subdivision not in available_subdivisions:
            return False, f"Invalid subdivision. Available: {', '.join(available_subdivisions[:5])}..."
            
        return True, None
