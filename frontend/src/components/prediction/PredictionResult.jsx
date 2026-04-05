import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudRain, Droplets, Calendar, TrendingUp } from "lucide-react";

const PredictionResult = ({ state, subdivision, year, data }) => {
    const { predictedAnnual, predictedMonsoon, confidence, seasonalData } = data;

    return (
        <Card className="border-none shadow-elegant animate-fade-in">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Prediction Results</CardTitle>
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        {confidence}% Confidence
                    </Badge>
                </div>
                <CardDescription>
                    Rainfall forecast for {subdivision}, {state} in {year}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Annual Prediction */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-card">
                    <div className="p-3 rounded-full bg-primary/10">
                        <CloudRain className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Predicted Annual Rainfall</p>
                        <p className="text-2xl font-bold text-primary">{predictedAnnual} mm</p>
                    </div>
                </div>

                {/* Monsoon Prediction */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-card">
                    <div className="p-3 rounded-full bg-accent/10">
                        <Droplets className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Monsoon Season (Jun-Sep)</p>
                        <p className="text-2xl font-bold text-accent">{predictedMonsoon} mm</p>
                    </div>
                </div>

                {/* Seasonal Breakdown */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Seasonal Breakdown</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {seasonalData.map((season) => (
                            <div key={season.season} className="p-3 rounded-lg bg-muted/50">
                                <p className="text-xs text-muted-foreground mb-1">{season.season}</p>
                                <p className="text-lg font-semibold">{season.rainfall} mm</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insights */}
                <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Key Insights</p>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Monsoon contributes {Math.round((predictedMonsoon / predictedAnnual) * 100)}% of annual rainfall</li>
                        <li>• Expected to be {predictedAnnual > 3000 ? "above" : "near"} average for the region</li>
                        <li>• High confidence in prediction model</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default PredictionResult;
