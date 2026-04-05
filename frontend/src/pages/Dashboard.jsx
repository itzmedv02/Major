import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Activity, MapPin, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchWeather } from '@/services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ state: 'Locating...', name: '' });

  useEffect(() => {
    // Attempt Geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ state: 'Located', coords: { lat: latitude, lon: longitude } });
          const w = await fetchWeather(latitude, longitude);
          if (w) setWeather(w);
        },
        (err) => {
            console.error(err);
            setLocation({ state: 'Location Denied', name: 'N/A' });
        }
      );
    } else {
        setLocation({ state: 'Not supported', name: 'N/A' });
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to AgriRaincast. Monitor trends and predict future rainfall.
          </p>
        </div>
        <Link to="/predict">
            <Button className="gap-2">
            <Search className="w-4 h-4" /> Run Prediction
            </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Local Weather</CardTitle>
              <CloudRain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {weather ? `${Math.round(weather.main.temp)}°C` : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground capitalize">
                {weather ? weather.weather[0].description : 'API config needed'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Activity className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">Online</div>
              <p className="text-xs text-muted-foreground">
                ML Model loaded (RandomForest)
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Location</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold truncate">
                 {location.state === 'Located' ? `${location.coords.lat.toFixed(2)}, ${location.coords.lon.toFixed(2)}` : location.state}
              </div>
              <p className="text-xs text-muted-foreground">Detected from browser</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card className="mt-8 overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Welcome to the Next Generation Predictor</CardTitle>
          <CardDescription>
            The backend is now powered by robust Machine Learning algorithms (RandomForest Regressors) to predict rainfall patterns by subdivision. Get started by heading to the Prediction section.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {/* Add an illustration image or graphic here if desired. Framer motion can animate it */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
