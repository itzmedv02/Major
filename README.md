# Rainfall Prediction System 🌧️

A production-ready web application that predicts annual and seasonal rainfall for various geographical subdivisions using Machine Learning (Random Forest Regressors). Built with a modern React frontend and a robust Flask Python backend.

---

## 🌟 Key Features

- **Machine Learning Integration**: Robust **RandomForestRegressor** yielding accurate multi-season metrics based on decades of historical weather data.
- **Modern User Interface**: Built entirely with React, Tailwind CSS, ShadCN UI, and Framer Motion for buttery-smooth interactive UX.
- **Predictive Analytics**: Generate complex weather logic visualized via Recharts.
- **PDF Reporting**: Export prediction dashboards securely as dynamically generated PDF reports.
- **Persistent History**: The backend caches and stores prediction queries into SQLite (via SQLAlchemy) for tracking historical searches.
- **Performance Optimized**: Features React strict lazy-loading protocols to drastically reduce initial bundle size for slow connections.

---

## 🏗️ Architecture Stack

### Frontend
* **Core:** React 18, Vite
* **Styling:** Tailwind CSS, next-themes (Dark Mode natively bound)
* **Components:** ShadCN UI, Radix-UI Primitives
* **Animations:** Framer Motion
* **Charts:** Recharts

### Backend
* **Core:** Python 3.10+, Flask
* **Database:** Flask-SQLAlchemy (SQLite default engine)
* **Machine Learning:** Scikit-Learn (RandomForestRegressor), Joblib, Numpy, Pandas
* **Report Generation:** ReportLab 

---

## 🚀 Getting Started

### 1. Requirements
Ensure you have the following installed on your machine:
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- pip & Python virtual environments (`venv`)

### 2. Environment Variables
To get the most out of the system, create an environment file for both the server and client.

**Frontend (`frontend/.env`):**
```env
VITE_OPENWEATHER_API_KEY=your_key_here
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend (`backend/.env`):**
```env
FLASK_ENV=development
```

### 3. Quick Start (Windows)
We've provided a simple batch script that safely initializes the virtual environment, installs backend/frontend packages, and boots both development servers.

```bash
.\scripts\start-dev.bat
```

### 4. Manual Setup
If you prefer booting services manually:

**Boot the Server:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Train the ML Model manually (Optional - will fallback if skipped)
python core/train_model.py

python app.py
```

**Boot the Client:**
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

---

## 🌍 Free-Tier Deployment Guides

This project was intentionally decoupled to allow strictly free-tier deployment strategies on popular edge networks.

1. **Frontend (Vercel)**
   - Connect the `frontend/` folder directly to Vercel via Github.
   - Vercel will automatically read the `vercel.json` included assuring proper Single-Page App rewriting configurations across their Edge Network.

2. **Backend (Render.com)**
   - Connect the repository to Render.
   - Render will recognize the `render.yaml` root file and automatically spin up a dedicated Web Service running Gunicorn for Python production.

---

## 🤝 Contributing
Open to PRs & Issues. Developed as part of a 2026 Academic Major Project constraint ensuring modern cloud, UI, and ML standards.
