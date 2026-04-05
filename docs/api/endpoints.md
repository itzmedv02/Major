# 📡 API Documentation

## Overview
This document describes the REST API endpoints provided by the Python Flask backend for the Rainfall Prediction System.

**Base URL:** `http://localhost:5000`

---

## Authentication
Currently, no authentication is required. All endpoints are publicly accessible.

---

## Endpoints

### 1. Health Check

Check if the API server is running and healthy.

**Endpoint:** `GET /api/health`

**Request:**
```bash
curl http://localhost:5000/api/health
```

**Response:** `200 OK`
```json
{
  "status": "healthy",
  "message": "Rainfall Prediction API is running",
  "version": "1.0.0"
}
```

**Error Response:** `503 Service Unavailable`
```json
{
  "status": "unhealthy",
  "message": "Model not initialized"
}
```

---

### 2. Get Subdivisions

Retrieve a list of all available Indian subdivisions for which predictions can be made.

**Endpoint:** `GET /api/subdivisions`

**Request:**
```bash
curl http://localhost:5000/api/subdivisions
```

**Response:** `200 OK`
```json
{
  "subdivisions": [
    "ANDAMAN & NICOBAR ISLANDS",
    "ARUNACHAL PRADESH",
    "ASSAM & MEGHALAYA",
    "BIHAR",
    "CHHATTISGARH",
    "COASTAL ANDHRA PRADESH",
    "COASTAL KARNATAKA",
    ...
  ],
  "count": 36
}
```

**Error Response:** `503 Service Unavailable`
```json
{
  "error": "Model not initialized"
}
```

---

### 3. Predict Rainfall

Get rainfall prediction for a specific subdivision and year.

**Endpoint:** `POST /api/predict`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "subdivision": "COASTAL ANDHRA PRADESH",
  "year": 2024,
  "state": "ANDHRA PRADESH"  // Optional, for compatibility
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "subdivision": "COASTAL ANDHRA PRADESH",
    "year": 2024
  }'
```

**Response:** `200 OK`
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

**Error Responses:**

`400 Bad Request` - Missing or invalid parameters
```json
{
  "error": "subdivision is required"
}
```

```json
{
  "error": "year must be a valid integer"
}
```

```json
{
  "error": "Invalid subdivision. Available: ANDAMAN & NICOBAR ISLANDS, ..."
}
```

`503 Service Unavailable` - Model not initialized
```json
{
  "error": "Model not initialized"
}
```

`500 Internal Server Error` - Server error
```json
{
  "error": "Internal server error: <error message>"
}
```

---

## Data Models

### Prediction Response

| Field | Type | Description |
|-------|------|-------------|
| `predictedAnnual` | number | Predicted annual rainfall in mm |
| `predictedMonsoon` | number | Predicted monsoon rainfall in mm |
| `confidence` | number | Prediction confidence score (85-95%) |
| `seasonalData` | array | Seasonal breakdown of rainfall |
| `metadata` | object | Additional prediction metadata |

### Seasonal Data Item

| Field | Type | Description |
|-------|------|-------------|
| `season` | string | Season name (e.g., "Jun-Sep (Monsoon)") |
| `rainfall` | number | Predicted rainfall for this season in mm |

### Metadata

| Field | Type | Description |
|-------|------|-------------|
| `subdivision` | string | Subdivision name used for prediction |
| `year` | number | Year for which prediction was made |
| `historical_data_points` | number | Number of historical data points used |
| `trend_factor` | number | Trend adjustment factor applied |

---

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request - Invalid input parameters |
| 404 | Not Found - Endpoint doesn't exist |
| 500 | Internal Server Error - Server-side error |
| 503 | Service Unavailable - Model not initialized |

---

## Rate Limiting

Currently, there is no rate limiting implemented. This may be added in future versions.

---

## CORS

The API is configured to accept requests from:
- `http://localhost:8080` (Vite default)
- `http://localhost:5173` (Vite alternative)

If your frontend runs on a different port, update the CORS configuration in `app.py`.

---

## Examples

### JavaScript/Fetch

```javascript
const predictRainfall = async (subdivision, year) => {
  const response = await fetch('http://localhost:5000/api/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subdivision, year })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return await response.json();
};

// Usage
try {
  const result = await predictRainfall('COASTAL ANDHRA PRADESH', 2024);
  console.log('Predicted Annual:', result.predictedAnnual);
} catch (error) {
  console.error('Prediction failed:', error.message);
}
```

### Python/Requests

```python
import requests

def predict_rainfall(subdivision, year):
    url = 'http://localhost:5000/api/predict'
    data = {
        'subdivision': subdivision,
        'year': year
    }
    
    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API Error: {response.json().get('error')}")

# Usage
try:
    result = predict_rainfall('COASTAL ANDHRA PRADESH', 2024)
    print(f"Predicted Annual: {result['predictedAnnual']} mm")
except Exception as e:
    print(f"Prediction failed: {e}")
```

### cURL

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

---

## Versioning

Current API Version: **1.0.0**

Future versions will be indicated in the health check response.

---

## Support

For issues or questions about the API:
1. Check the [Integration Setup Guide](INTEGRATION_SETUP.md)
2. Review the [Python Backend README](Python/README.md)
3. Check server logs for detailed error messages

---

## Authors
- Devansh Verma
- Jatin Saini
- Anant Sharma
- Krishna Yadav

---

© 2025 Rainfall Prediction System. All Rights Reserved.
