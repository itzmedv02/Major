# 🔗 Integration Setup Guide

## Overview
This guide will help you set up and run both the Python ML backend and React frontend together.

## Prerequisites

### For Python Backend
- Python 3.8 or higher
- pip (Python package manager)

### For React Frontend
- Node.js v18 or higher
- npm or yarn

## Quick Start (Both Servers)

### Step 1: Set Up Python Backend

```bash
# Navigate to Python directory
cd Python

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
```

The Python API will start on **http://localhost:5000**

### Step 2: Set Up React Frontend

Open a **new terminal window** and:

```bash
# Navigate to Major directory
cd Major

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The React app will start on **http://localhost:8080**

### Step 3: Test the Integration

1. Open your browser to **http://localhost:8080**
2. Navigate to the prediction page
3. Select a state, subdivision, and year
4. Click "Predict Rainfall"
5. You should see real predictions from the ML model!

## Detailed Setup

### Python Backend Setup

1. **Navigate to Python directory**
   ```bash
   cd "c:/Users/91997/Desktop/7th Sem/Major CD 2026/Major CD 2026/Python"
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Verify installation**
   ```bash
   python -c "import flask; import pandas; print('✓ All dependencies installed')"
   ```

5. **Start the server**
   ```bash
   python app.py
   ```

   You should see:
   ```
   🌧️  Rainfall Prediction API Server
   📍 Server running on: http://localhost:5000
   ```

### React Frontend Setup

1. **Navigate to Major directory**
   ```bash
   cd "c:/Users/91997/Desktop/7th Sem/Major CD 2026/Major CD 2026/Major"
   ```

2. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Verify environment configuration**
   Check that `.env` file contains:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE ready in XXX ms
   ➜  Local:   http://localhost:8080/
   ```

## Running Both Servers Concurrently

### Option 1: Two Terminal Windows (Recommended)

**Terminal 1 - Python Backend:**
```bash
cd Python
venv\Scripts\activate
python app.py
```

**Terminal 2 - React Frontend:**
```bash
cd Major
npm run dev
```

### Option 2: Using npm concurrently (Advanced)

You can install `concurrently` to run both servers from one command:

```bash
# In the root directory
npm install -g concurrently

# Create a script to run both
concurrently "cd Python && python app.py" "cd Major && npm run dev"
```

## Verification

### 1. Check Python Backend

Open a browser or use curl:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "message": "Rainfall Prediction API is running",
  "version": "1.0.0"
}
```

### 2. Check React Frontend

Open browser to: **http://localhost:8080**

You should see the rainfall prediction app homepage.

### 3. Test Integration

1. Go to the prediction page
2. Select:
   - State: Any state
   - Subdivision: COASTAL ANDHRA PRADESH (or any)
   - Year: 2024
3. Click "Predict Rainfall"
4. Check browser console (F12) for:
   ```
   ✓ Prediction received from ML model: {...}
   ```

## Troubleshooting

### Python Backend Issues

**Problem: Port 5000 already in use**
```
Error: Address already in use
```

Solution: Change port in `Python/app.py`:
```python
app.run(host='0.0.0.0', port=5001, debug=True)
```

And update `Major/.env`:
```
VITE_API_URL=http://localhost:5001
```

**Problem: Module not found**
```
ModuleNotFoundError: No module named 'flask'
```

Solution:
```bash
# Make sure virtual environment is activated
venv\Scripts\activate
pip install -r requirements.txt
```

**Problem: Data file not found**
```
FileNotFoundError: Data file not found: rainfall.csv
```

Solution: Ensure `rainfall.csv` is in the `Python` directory.

### React Frontend Issues

**Problem: CORS errors in browser console**
```
Access to fetch at 'http://localhost:5000' has been blocked by CORS policy
```

Solution: The Flask backend should have CORS configured. Check `Python/app.py` has:
```python
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:8080"]}})
```

**Problem: Backend not available warning**
```
⚠️  Backend not available, using fallback simulation
```

Solution: Make sure Python backend is running on port 5000.

**Problem: Environment variable not loaded**

Solution: Restart the development server after changing `.env`:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### General Issues

**Problem: Both servers running but not communicating**

1. Check Python backend is on port 5000:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. Check React `.env` file has correct URL:
   ```
   VITE_API_URL=http://localhost:5000
   ```

3. Restart React dev server after changing `.env`

4. Check browser console for errors (F12)

## Development Workflow

### Making Changes to Python Backend

1. Edit files in `Python/` directory
2. Flask auto-reloads on file changes (debug mode)
3. No need to restart server

### Making Changes to React Frontend

1. Edit files in `Major/src/` directory
2. Vite hot-reloads automatically
3. Changes appear immediately in browser

### Testing API Changes

Use curl or Postman to test API endpoints:

```bash
# Test prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d "{\"subdivision\":\"COASTAL ANDHRA PRADESH\",\"year\":2024}"
```

## Production Deployment

### Python Backend

For production, use a production WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### React Frontend

Build for production:

```bash
cd Major
npm run build
```

The built files will be in `Major/dist/` directory.

## Environment Variables

### Python Backend
Currently uses default values. Can be extended with:
- `FLASK_ENV`: development/production
- `PORT`: Server port (default: 5000)

### React Frontend (`.env`)
```bash
VITE_API_URL=http://localhost:5000  # Python backend URL
VITE_SUPABASE_PROJECT_ID=...        # Existing Supabase config
VITE_SUPABASE_PUBLISHABLE_KEY=...   # Existing Supabase config
VITE_SUPABASE_URL=...               # Existing Supabase config
```

## Next Steps

1. ✅ Both servers running
2. ✅ Integration working
3. 📝 Add more features to the ML model
4. 📝 Enhance UI with additional visualizations
5. 📝 Deploy to production

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review browser console for errors (F12)
3. Check Python terminal for error messages
4. Verify all dependencies are installed
5. Ensure both servers are running

## Authors
- Devansh Verma
- Jatin Saini
- Anant Sharma
- Krishna Yadav
