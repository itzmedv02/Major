import os
import pandas as pd
import numpy as np
import joblib
from pathlib import Path
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score

# Ensure paths
CORE_DIR = Path(__file__).parent
DATA_PATH = CORE_DIR.parent / 'data' / 'rainfall.csv'
MODEL_DIR = CORE_DIR.parent / 'models'

def train_and_save_model():
    print(f"Loading data from {DATA_PATH}...")
    if not DATA_PATH.exists():
        print(f"Error: {DATA_PATH} not found.")
        return
        
    df = pd.read_csv(DATA_PATH)
    
    # Fill missing values
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())
    df.dropna(subset=['SUBDIVISION'], inplace=True)
    
    # Feature Engineering
    # We will use SUBDIVISION and YEAR as features.
    
    print("Encoding categorical features...")
    le = LabelEncoder()
    df['SUBDIVISION_encoded'] = le.fit_transform(df['SUBDIVISION'])
    
    # Features and Target
    X = df[['SUBDIVISION_encoded', 'YEAR']]
    # We want to predict ANNUAL strictly, but also seasonal can be predicted.
    # For simplicity, we might train multiple regressors or a multi-output regressor.
    y = df[['ANNUAL', 'Jun-Sep', 'Jan-Feb', 'Mar-May', 'Oct-Dec']]
    
    print("Splitting dataset...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training RandomForestRegressor...")
    model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train)
    
    print("Evaluating model...")
    y_pred = model.predict(X_test)
    y_pred_annual = y_pred[:, 0]
    y_test_annual = y_test['ANNUAL'].values
    
    mae = mean_absolute_error(y_test_annual, y_pred_annual)
    r2 = r2_score(y_test_annual, y_pred_annual)
    
    print(f"Model Performance -> MAE: {mae:.2f}, R2: {r2:.2f}")
    
    # Save the model
    os.makedirs(MODEL_DIR, exist_ok=True)
    model_path = MODEL_DIR / 'rf_model.joblib'
    encoder_path = MODEL_DIR / 'label_encoder.joblib'
    
    print("Saving model and encoder...")
    joblib.dump(model, model_path)
    joblib.dump(le, encoder_path)
    print("✓ Model training completed successfully!")

if __name__ == '__main__':
    train_and_save_model()
