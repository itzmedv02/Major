/**
 * Service to handle rainfall prediction logic.
 * Connects to the Python Flask API backend for real ML predictions.
 * Falls back to simulated data if the backend is unavailable.
 */

// Get API URL from environment variable, fallback to localhost
const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = apiUrl ? apiUrl.replace(/\/+$/, '') : 'http://localhost:5000';

/**
 * Predict rainfall using the Python ML model API
 * @param {string} state - State name (for compatibility, not used by API)
 * @param {string} subdivision - Subdivision name
 * @param {number} year - Year to predict for
 * @returns {Promise<Object>} Prediction results
 */
export const predictRainfall = async (state, subdivision, year) => {
    try {
        // Make API request to Python backend
        const response = await fetch(`${API_URL}/api/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state,
                subdivision,
                year: parseInt(year)
            }),
            // Add timeout to prevent hanging
            signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        // Check if response is ok
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `API Error: ${response.status}`);
        }

        // Parse and return the prediction data
        const data = await response.json();
        
        console.log('✓ Prediction received from ML model:', data);
        
        return data;

    } catch (error) {
        console.error('Error calling prediction API:', error);
        
        // Check if it's a network error (backend not running)
        if (error.name === 'TypeError' || error.message.includes('fetch')) {
            console.warn('⚠️  Backend not available, using fallback simulation');
            return generateFallbackPrediction(subdivision, year);
        }
        
        // Re-throw other errors
        throw error;
    }
};

/**
 * Fallback prediction function (simulated data)
 * Used when the Python backend is not available
 */
const generateFallbackPrediction = (subdivision, year) => {
    console.warn('Using simulated prediction data (backend unavailable)');
    
    // Simulate network latency
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulated prediction algorithm
            const predictedAnnual = Math.floor(Math.random() * 1000) + 2500;
            const predictedMonsoon = Math.floor(predictedAnnual * 0.65);
            const confidence = (Math.random() * 4 + 92).toFixed(1);

            const seasonalData = [
                { season: "Jan-Feb (Winter)", rainfall: Math.floor(Math.random() * 100) + 50 },
                { season: "Mar-May (Pre-Monsoon)", rainfall: Math.floor(Math.random() * 300) + 150 },
                { season: "Jun-Sep (Monsoon)", rainfall: predictedMonsoon },
                { season: "Oct-Dec (Post-Monsoon)", rainfall: Math.floor(Math.random() * 400) + 200 },
            ];

            resolve({
                predictedAnnual,
                predictedMonsoon,
                confidence,
                seasonalData,
                metadata: {
                    subdivision,
                    year,
                    source: 'fallback_simulation',
                    warning: 'Python backend not available - using simulated data'
                }
            });
        }, 1500);
    });
};

/**
 * Get list of available subdivisions from the API
 * @returns {Promise<Array<string>>} List of subdivision names
 */
export const getSubdivisions = async () => {
    try {
        const response = await fetch(`${API_URL}/api/subdivisions`, {
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.subdivisions || [];

    } catch (error) {
        console.error('Error fetching subdivisions:', error);
        // Return empty array on error
        return [];
    }
};

/**
 * Check if the Python backend is available
 * @returns {Promise<boolean>} True if backend is healthy
 */
export const checkBackendHealth = async () => {
    try {
        const response = await fetch(`${API_URL}/api/health`, {
            signal: AbortSignal.timeout(3000)
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data.status === 'healthy';

    } catch (error) {
        console.error('Backend health check failed:', error);
        return false;
    }
};
