import { Database, Cloud, Droplets } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StatsSection = () => {
    return (
        <section className="py-16 px-4 bg-background">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-none shadow-elegant bg-gradient-card animate-fade-in">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                            <Database className="w-5 h-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-primary">4000+</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Historical rainfall records
                            </p>
                        </CardContent>
                    </Card>

                    <Card
                        className="border-none shadow-elegant bg-gradient-card animate-fade-in"
                        style={{ animationDelay: "0.1s" }}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Time Period</CardTitle>
                            <Cloud className="w-5 h-5 text-accent" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-accent">115 Years</div>
                            <p className="text-xs text-muted-foreground mt-1">From 1901 to 2015</p>
                        </CardContent>
                    </Card>

                    <Card
                        className="border-none shadow-elegant bg-gradient-card animate-fade-in"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                            <Droplets className="w-5 h-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-primary">94.2%</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Model prediction accuracy
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
