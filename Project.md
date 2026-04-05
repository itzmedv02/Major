# Rainfall Prediction System - Project Overview

## Project Overview
The **Rainfall Prediction System** is a machine learning-powered application designed to forecast annual rainfall for various subdivisions in India. By leveraging historical weather data and advanced prediction algorithms, the system provides users with accurate rainfall estimates to assist in agricultural planning, water resource management, and disaster preparedness.

### Key Features
- **Accurate Predictions**: Uses a trained Linear Regression model to predict annual rainfall based on historical trends.
- **Interactive UI**: User-friendly React interface for selecting regions and years.
- **Real-time Processing**: Fast response times via a lightweight Flask API.
- **Data Visualization**: Clear presentation of prediction results and error margins.
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS and Shadcn UI.

---

## Technologies Used
- **Frontend**: React, Vite, Tailwind CSS, Shadcn UI
- **Backend**: Python, Flask (REST API)
- **Machine Learning**: Scikit-learn, Pandas, NumPy, Joblib
- **Data Processing**: Python Pandas

---

## System Workflow
The application follows a streamlined client-server architecture:

1.  **User Input**: The user selects a `State`, `Subdivision`, and `Target Year` in the React Frontend.
2.  **API Request**: The Frontend sends a POST request with these parameters to the Backend API (`/api/predict`).
3.  **Data Processing**: The Flask Backend validates the input and prepares it for the model.
4.  **ML Inference**: The pre-trained Python ML model processes the input features and generates a rainfall prediction (in mm).
5.  **Response**: The prediction is sent back to the Frontend (JSON format) and displayed to the user instantly.

---

## Folder Structure

```
Major CD 2026/
├── backend/                # Python Backend & ML Logic
│   ├── api/               # API endpoint definitions
│   ├── core/              # Core business logic
│   ├── data/              # Dataset files (CSV)
│   ├── models/            # Saved ML model files (.pkl/.joblib)
│   ├── notebooks/         # Jupyter notebooks for model training
│   ├── app.py             # Main Flask application entry point
│   └── requirements.txt   # Python dependencies
│
├── frontend/               # React Frontend Application
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utility functions
│   │   └── App.jsx        # Main component
│   ├── package.json       # Node.js dependencies
│   └── vite.config.js     # Build configuration
│
├── docs/                   # Project Documentation
└── scripts/                # Utility/Startup scripts
```

---

## How to Run

### 1. Prerequisites
- **Python 3.8+** installed.
- **Node.js 18+** installed.

### 2. Startup (Automatic)
Run the included startup script:
```cmd
scripts\start-dev.bat
```
This will launch both the Backend (Port 5000) and Frontend (Port 8080) in separate terminals.

### 3. Startup (Manual)
**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## Challenges & Solutions

| Challenge | Solution |
| :--- | :--- |
| **Model Integration** | Integrating a Python ML model with a JS frontend. Solved by building a RESTful Flask API to serve as a bridge. |
| **CORS Errors** | Handled Cross-Origin Resource Sharing issues by configuring `flask-cors` to explicitly allow requests from the frontend origin. |
| **Project Structure** | Initially had duplicate/flat folder structures. Solved by refactoring into a clean `backend`/`frontend` monorepo structure. |

---

## Future Improvements
- **Advanced Visualizations**: Add charts to show rainfall trends over the last decade.
- **Multiple Models**: Integrate other algorithms (Random Forest, LSTM) for comparison.
- **Authentication**: Add user login to save prediction history.
- **Weather API Integration**: Fetch real-time current weather data to augment predictions.
