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

**For the complete integration setup guide, see:** [INTEGRATION_SETUP.md](../INTEGRATION_SETUP.md)

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Python 3.8+ (for ML backend)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Major
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   
   The `.env` file should contain:
   ```bash
   VITE_API_URL=http://localhost:5000  # Python backend URL
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:8080`

### Python Backend Setup

1. **Navigate to Python directory**
   ```bash
   cd ../Python
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # macOS/Linux
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start Flask server**
   ```bash
   python app.py
   ```

   The API will be available at `http://localhost:5000`

### Running Both Servers

You need to run both servers simultaneously:

**Terminal 1 (Python Backend):**
```bash
cd Python
venv\Scripts\activate
python app.py
```

**Terminal 2 (React Frontend):**
```bash
cd Major
npm run dev
```

---

## 📂 Project Structure
```
Major/                    # React Frontend
├── src/
│   ├── components/       # Modular UI components
│   │   ├── home/        # Landing page sections
│   │   ├── prediction/  # Core prediction logic & forms
│   │   ├── layout/      # Global layout (Footer, etc.)
│   │   └── ui/          # Reusable design tokens (Buttons, Cards)
│   ├── data/            # Static datasets (Regions, States)
│   ├── services/        # API integration layer
│   │   └── predictionService.js  # Calls Python backend
│   └── pages/           # Route controllers
├── .env                 # Environment variables
└── README.md           # This file

Python/                  # ML Backend
├── app.py              # Flask API server
├── model.py            # ML model wrapper
├── data_processor.py   # Data preprocessing
├── rainfall.csv        # Historical data (1901-2015)
├── requirements.txt    # Python dependencies
└── README.md          # Python backend docs
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
cd Major
npm run dev
```
Note: Will use fallback simulated data if Python backend is not running.

### Test Backend Only
```bash
cd Python
python app.py

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
- Check `.env` file has correct `VITE_API_URL`
- Restart React dev server after changing `.env`

### CORS Errors
- Python backend has CORS configured for localhost:8080
- If using different port, update `app.py` CORS settings

### Module Not Found (Python)
```bash
pip install -r requirements.txt
```

For more troubleshooting, see [INTEGRATION_SETUP.md](../INTEGRATION_SETUP.md)

---

## 📚 Documentation

- **Integration Guide**: [INTEGRATION_SETUP.md](../INTEGRATION_SETUP.md)
- **Python Backend**: [Python/README.md](../Python/README.md)
- **Implementation Plan**: [implementation_plan.md](../.gemini/antigravity/brain/fbb8fe76-9ee9-4661-87db-0e0b7018c089/implementation_plan.md)

---

## 🚀 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

---

© 2025 Rainfall Prediction System. All Rights Reserved.
