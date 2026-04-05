# 🌧️ Rainfall Prediction System - India Weather Analytics (Major Project)

## 👨‍💻 Project Team
**Developed by Final Year Students:**
- **Devansh Verma**
- **Jatin Saini**
- **Anant Sharma**
- **Krishna Yadav**

---

## 📖 Project Abstract
This major project addresses the critical challenge of rainfall forecasting in India, a country whose economy is heavily dependent on agriculture. We have developed a comprehensive web-based system that leverages **Machine Learning** algorithms trained on **115 years (1901-2015)** of historical rainfall data. 

The system provides subdivision-wise rainfall predictions, analyzes seasonal trends (Monsoon, Pre-Monsoon, etc.), and offers visualized insights to aid meteorological decision-making and agricultural planning.

---

## 🚀 Key Features
- **Real ML Predictions**: Python Flask backend serving trained ML model
- **Accurate Prediction Logic**: Custom algorithm analyzing historical averages and trends
- **Interactive Visualizations**: Dynamic charts comparing annual vs. monsoon rainfall over decades
- **Granular Data**: Support for all major Indian states and specific subdivisions
- **Modern UI/UX**: Responsive, glassmorphic design built for optimal user experience
- **Fallback Mechanism**: Graceful degradation if backend is unavailable

---

## 🛠️ Tech Stack & Architecture
We utilized a modern, industry-standard stack to ensure performance and scalability:

### Frontend
- **Framework**: React.js (v18)
- **Build Tool**: Vite for optimized production builds
- **Styling**: Tailwind CSS with custom animations and a premium color palette
- **UI Library**: Shadcn/UI (Radix Primitives) for accessible components
- **Visualization**: Recharts for data plotting
- **State Management**: React Hooks (useState, useEffect)

### Backend
- **ML Framework**: Python with Pandas & NumPy
- **API**: Flask REST API with CORS support
- **Data**: 115 years of historical rainfall data (1901-2015)

---

## 💻 Setup Guide (Local Development)

### Quick Start

**For the complete integration setup guide, see:** [Integration Setup Guide](../docs/setup/integration-guide.md)

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Python 3.8+ (for ML backend)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Rainfall-Prediction-System-main/frontend
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file at `frontend/.env` with:
   ```bash
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the frontend**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:8080`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd ../backend
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # macOS/Linux
   ```

3. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend**
   ```bash
   python app.py
   ```

   The API will be available at `http://localhost:5000`

### Running Both Servers

Open two terminals and use these commands:

**Terminal 1 (Backend):**
```bash
cd Rainfall-Prediction-System-main/backend
venv\Scripts\activate
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd Rainfall-Prediction-System-main/frontend
npm run dev
```

---

## 📂 Project Structure
```
frontend/                # React frontend application
├── src/
│   ├── components/      # Modular UI components
│   ├── data/            # Static datasets (regions, states)
│   ├── services/        # API integration layer
│   └── pages/           # Routes and page layouts
├── .env.example         # Frontend environment template
└── README.md            # Frontend docs

backend/                 # Python ML backend and API
├── core/                # Model, database, and utility modules
├── instance/            # SQLite database and generated artifacts
├── requirements.txt     # Backend Python dependencies
├── app.py               # Flask API server
└── README.md            # Backend docs
```

---

## 🔌 API Integration

The frontend communicates with the Python backend via REST API:

### Endpoints Used
- `POST /api/predict` - Get rainfall prediction
- `GET /api/health` - Check backend status
- `GET /api/subdivisions` - Get available subdivisions

### Example Request
```javascript
const response = await fetch('http://localhost:5000/api/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        subdivision: 'COASTAL ANDHRA PRADESH',
        year: 2024
    })
});
```

---

## 🧪 Testing

### Test Frontend Only
```bash
cd Rainfall-Prediction-System-main/frontend
npm run dev
```
Note: The frontend will gracefully fall back to simulated data if the Python backend is not running.

### Test Backend Only
```bash
cd Rainfall-Prediction-System-main/backend
python app.py
```

# In another terminal, test with curl:
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"subdivision":"COASTAL ANDHRA PRADESH","year":2024}'
```

### Test Full Integration
1. Start both servers (see "Running Both Servers" above)
2. Open browser to http://localhost:8080
3. Navigate to prediction page
4. Make a prediction
5. Check browser console for: `✓ Prediction received from ML model`

---

## 🐛 Troubleshooting

### Backend Not Connecting
- Ensure Python server is running on port 5000
- Check `frontend/.env` has correct `VITE_API_URL`
- Restart React dev server after changing `.env`

### CORS Errors
- Python backend has CORS configured for localhost:8080
- If using a different port, update `app.py` CORS settings

### Module Not Found (Python)
```bash
cd Rainfall-Prediction-System-main/backend
pip install -r requirements.txt
```

For more troubleshooting, see [Integration Setup Guide](../docs/setup/integration-guide.md)

---

## 📚 Documentation

- **Integration Guide**: [Integration Setup Guide](../docs/setup/integration-guide.md)
- **Backend README**: [Backend README](../backend/README.md)

---

## 🚀 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

---

© 2025 Rainfall Prediction System. All Rights Reserved.
