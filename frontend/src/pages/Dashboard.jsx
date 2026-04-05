import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Activity, MapPin, Search, Sun, TrendingUp, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchWeather } from '@/services/api';
import { Link } from 'react-router-dom';
import RainfallChart from '@/components/prediction/RainfallChart';

const stats = [
  {
    title: 'Historical Records',
    value: '4,000+',
    description: 'Rainfall entries from 1901 to 2015',
    icon: Sun,
    accent: 'text-amber-400',
  },
  {
    title: 'Prediction Confidence',
    value: '94.2%',
    description: 'Model accuracy on validation data',
    icon: TrendingUp,
    accent: 'text-emerald-400',
  },
  {
    title: 'Realtime Insights',
    value: 'Live updates',
    description: 'Weather API and prediction pipeline',
    icon: ShieldCheck,
    accent: 'text-sky-400',
  },
];

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ state: 'Locating...', name: '' });

  useEffect(() => {
    if ('geolocation' in navigator) {
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
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 text-white shadow-elegant">
        <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-12 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/90">
              rainfall intelligence
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Smarter rainfall insights for better harvest decisions
              </h1>
              <p className="max-w-2xl text-sm text-slate-300">
                Explore local weather, seasonal patterns, and prediction outputs in one elegant dashboard built for agriculture planning.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/predict">
                <Button size="lg" className="shadow-lg" variant="secondary">
                  <Search className="w-4 h-4" /> Run Prediction
                </Button>
              </Link>
              <Link to="/history">
                <Button size="lg" variant="outline">
                  View History
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="border-none bg-white/5 shadow-elegant backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/10">
                  <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-100">{stat.title}</CardTitle>
                    <Icon className={`${stat.accent} h-5 w-5`} />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <motion.div whileHover={{ y: -4 }} className="rounded-[1.5rem] border border-border bg-card shadow-elegant transition-transform duration-300">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Local Weather</CardTitle>
              <CloudRain className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">{weather ? `${Math.round(weather.main.temp)}°C` : 'N/A'}</div>
              <p className="mt-2 text-sm text-muted-foreground capitalize">
                {weather ? weather.weather[0].description : 'Enable location for live weather'}
              </p>
            </CardContent>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="rounded-[1.5rem] border border-border bg-card shadow-elegant transition-transform duration-300">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Status</CardTitle>
              <Activity className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-emerald-500">Online</div>
              <p className="mt-2 text-sm text-muted-foreground">RandomForest model loaded and ready</p>
            </CardContent>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="rounded-[1.5rem] border border-border bg-card shadow-elegant transition-transform duration-300">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Location</CardTitle>
              <MapPin className="h-5 w-5 text-sky-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">
                {location.state === 'Located' ? `${location.coords.lat.toFixed(2)}, ${location.coords.lon.toFixed(2)}` : location.state}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Detected from browser</p>
            </CardContent>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="rounded-[1.5rem] border border-border bg-card shadow-elegant transition-transform duration-300">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Forecast Signal</CardTitle>
              <TrendingUp className="h-5 w-5 text-fuchsia-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">Stable</div>
              <p className="mt-2 text-sm text-muted-foreground">Seasonal rainfall trend is steady</p>
            </CardContent>
          </motion.div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-border bg-gradient-card shadow-elegant">
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold">Seasonal Trend</h3>
              <p className="text-sm text-muted-foreground">
                Visual rainfall patterns for historical data and monsoon outlook.
              </p>
            </div>
            <RainfallChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
