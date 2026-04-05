"""
Data Processor for Rainfall Prediction Model
Handles loading, cleaning, and preprocessing of rainfall data.
"""

import pandas as pd
import numpy as np
from pathlib import Path

class RainfallDataProcessor:
    """Process rainfall data for model training and prediction."""
    
    def __init__(self, data_path='rainfall.csv'):
        """
        Initialize the data processor.
        
        Args:
            data_path (str): Path to the rainfall CSV file
        """
        self.data_path = Path(__file__).parent.parent / 'data' / data_path
        self.data = None
        
    def load_data(self):
        """Load rainfall data from CSV file."""
        try:
            self.data = pd.read_csv(self.data_path)
            print(f"✓ Loaded {len(self.data)} records from {self.data_path}")
            return self.data
        except FileNotFoundError:
            raise FileNotFoundError(f"Data file not found: {self.data_path}")
    
    def clean_data(self):
        """Clean and preprocess the data (fill missing values with mean)."""
        if self.data is None:
            self.load_data()
        
        # Fill missing values with column means (as done in the notebook)
        numeric_columns = self.data.select_dtypes(include=[np.number]).columns
        self.data[numeric_columns] = self.data[numeric_columns].fillna(
            self.data[numeric_columns].mean()
        )
        
        print(f"✓ Cleaned data - {self.data.isnull().sum().sum()} null values remaining")
        return self.data
    
    def get_subdivision_data(self, subdivision, year=None):
        """
        Get data for a specific subdivision.
        
        Args:
            subdivision (str): Name of the subdivision
            year (int, optional): Specific year to filter
            
        Returns:
            pd.DataFrame: Filtered data
        """
        if self.data is None:
            self.clean_data()
        
        filtered = self.data[self.data['SUBDIVISION'] == subdivision]
        
        if year:
            filtered = filtered[filtered['YEAR'] == year]
        
        return filtered
    
    def get_historical_average(self, subdivision):
        """
        Calculate historical averages for a subdivision.
        
        Args:
            subdivision (str): Name of the subdivision
            
        Returns:
            dict: Dictionary with average values
        """
        data = self.get_subdivision_data(subdivision)
        
        if len(data) == 0:
            return None
        
        return {
            'annual_avg': float(data['ANNUAL'].mean()),
            'monsoon_avg': float(data['Jun-Sep'].mean()),
            'winter_avg': float(data['Jan-Feb'].mean()),
            'pre_monsoon_avg': float(data['Mar-May'].mean()),
            'post_monsoon_avg': float(data['Oct-Dec'].mean()),
            'jan': float(data['JAN'].mean()),
            'feb': float(data['FEB'].mean()),
            'mar': float(data['MAR'].mean()),
            'apr': float(data['APR'].mean()),
            'may': float(data['MAY'].mean()),
            'jun': float(data['JUN'].mean()),
            'jul': float(data['JUL'].mean()),
            'aug': float(data['AUG'].mean()),
            'sep': float(data['SEP'].mean()),
            'oct': float(data['OCT'].mean()),
            'nov': float(data['NOV'].mean()),
            'dec': float(data['DEC'].mean())
        }
    
    def get_available_subdivisions(self):
        """Get list of all available subdivisions."""
        if self.data is None:
            self.clean_data()
        
        return sorted(self.data['SUBDIVISION'].unique().tolist())
    
    def get_year_range(self):
        """Get the range of years available in the dataset."""
        if self.data is None:
            self.clean_data()
        
        return {
            'min_year': int(self.data['YEAR'].min()),
            'max_year': int(self.data['YEAR'].max())
        }
