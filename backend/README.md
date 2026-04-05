# 🌧️ Rainfall Prediction API - Python Backend

## Overview
This is the Python Flask backend that serves the Machine Learning model for rainfall prediction. It provides REST API endpoints for the React frontend to consume.

## Features
- ✅ RESTful API with Flask
- ✅ CORS enabled for frontend communication
- ✅ Historical data analysis (115 years: 1901-2015)
- ✅ Subdivision-wise predictions
- ✅ Seasonal rainfall breakdown
- ✅ Confidence scoring

## Tech Stack
- **Framework**: Flask 3.0.0
- **Data Processing**: Pandas, NumPy
- **CORS**: Flask-CORS

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended)**
   ```bash
   python -m venv venv
   
   # Activate on Windows
   venv\Scripts\activate
   
   # Activate on macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Server

```bash
python app.py
```

The API server will start on `http://localhost:5000`

You should see:
```
🌧️  Rainfall Prediction API Server
📍 Server running on: http://localhost:5000
📊 API Endpoints:
   - GET  /api/health       - Health check
   - GET  /api/subdivisions - List subdivisions
   - POST /api/predict      - Make prediction
```

## API Endpoints

### 1. Health Check
**GET** `/api/health`

Check if the API is running.

**Response:**
```json
{
  "status": "healthy",
  "message": "Rainfall Prediction API is running",
  "version": "1.0.0"
}
```

### 2. Get Subdivisions
**GET** `/api/subdivisions`

Get list of all available Indian subdivisions.

**Response:**
```json
{
  "subdivisions": [
    "ANDAMAN & NICOBAR ISLANDS",
    "ARUNACHAL PRADESH",
    ...
  ],
  "count": 36
}
```

### 3. Predict Rainfall
**POST** `/api/predict`

Predict rainfall for a specific subdivision and year.

**Request Body:**
```json
{
  "subdivision": "COASTAL ANDHRA PRADESH",
  "year": 2024
}
```

**Response:**
```json
{
  "predictedAnnual": 1245.6,
  "predictedMonsoon": 892.3,
  "confidence": 94.2,
  "seasonalData": [
    {
      "season": "Jan-Feb (Winter)",
      "rainfall": 45.2
    },
    {
      "season": "Mar-May (Pre-Monsoon)",
      "rainfall": 156.8
    },
    {
      "season": "Jun-Sep (Monsoon)",
      "rainfall": 892.3
    },
    {
      "season": "Oct-Dec (Post-Monsoon)",
      "rainfall": 151.3
    }
  ],
  "metadata": {
    "subdivision": "COASTAL ANDHRA PRADESH",
    "year": 2024,
    "historical_data_points": 115,
    "trend_factor": 1.023
  }
}
```

**Error Response:**
```json
{
  "error": "subdivision is required"
}
```

## Project Structure

```
Python/
├── app.py                 # Flask API server
├── model.py              # ML model wrapper
├── data_processor.py     # Data loading and preprocessing
├── rainfall.csv          # Historical data (1901-2015)
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

## How It Works

1. **Data Loading**: `data_processor.py` loads the historical rainfall CSV data
2. **Data Cleaning**: Missing values are filled with column means
3. **Prediction**: `model.py` uses historical averages and trend analysis
4. **API**: `app.py` exposes the model via REST endpoints
5. **Frontend**: React app calls these endpoints for predictions

## Model Details

The prediction model uses:
- **Historical Averages**: Mean rainfall values for each subdivision
- **Trend Analysis**: Recent 10-year trends vs overall average
- **Variation**: ±5% random variation for realistic predictions
- **Confidence**: Based on data consistency and availability

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, modify the port in `app.py`:
```python
app.run(host='0.0.0.0', port=5001, debug=True)
```

### Module Not Found
Make sure you've activated the virtual environment and installed dependencies:
```bash
pip install -r requirements.txt
```

### CORS Errors
The API is configured to accept requests from:
- `http://localhost:8080` (Vite default)
- `http://localhost:5173` (Vite alternative)

If your frontend runs on a different port, update the CORS configuration in `app.py`.

## Development

### Adding New Endpoints
Add new routes in `app.py`:
```python
@app.route('/api/your-endpoint', methods=['GET'])
def your_function():
    return jsonify({'data': 'value'}), 200
```

### Modifying Prediction Logic
Update the `predict()` method in `model.py`.

## Testing

Test the API using curl:
```bash
# Health check
curl http://localhost:5000/api/health

# Get subdivisions
curl http://localhost:5000/api/subdivisions

# Make prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"subdivision":"COASTAL ANDHRA PRADESH","year":2024}'
```

## License
© 2025 Rainfall Prediction System. All Rights Reserved.

## Authors
- Devansh Verma
- Jatin Saini
- Anant Sharma
- Krishna Yadav
