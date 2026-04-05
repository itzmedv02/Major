import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About AgriRaincast</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Empowering agriculture and resource planning with precision machine learning.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            AgriRaincast leverages historical meteorological data across India to predict future rainfall patterns. The core of the system is powered by a <strong>Random Forest Regressor</strong>, a robust ensemble machine learning algorithm that builds multiple decision trees to yield highly accurate continuous predictions.
          </p>
          <p>
            By considering both regional sub-divisions and chronological trends, the model provides granular, season-by-season forecasts that assist policymakers, farmers, and researchers in crucial decision-making.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
             <Badge variant="secondary">React</Badge>
             <Badge variant="secondary">Vite</Badge>
             <Badge variant="secondary">Tailwind CSS</Badge>
             <Badge variant="secondary">Framer Motion</Badge>
             <Badge variant="secondary">Python</Badge>
             <Badge variant="secondary">Flask</Badge>
             <Badge variant="secondary">Scikit-Learn</Badge>
             <Badge variant="secondary">SQLite</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Open Source</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This project is open-source and free to deploy. We utilize zero-cost hosting friendly architectures seamlessly adaptable to providers like Vercel and Render.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
