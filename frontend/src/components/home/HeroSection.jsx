import { Cloud, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onGetStarted, onViewDocs }) => {
    return (
        <section className="relative bg-gradient-hero text-white py-20 px-4 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center animate-fade-in">
                    <div className="inline-flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Cloud className="w-5 h-5" />
                        <span className="text-sm font-medium">ML-Powered Weather Analytics</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        India Rainfall Prediction
                        <br />
                        <span className="text-white/90">System</span>
                    </h1>

                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Advanced machine learning system analyzing 115 years of rainfall data across Indian subdivisions
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90 shadow-elegant"
                            onClick={onGetStarted}
                        >
                            Get Started
                            <TrendingUp className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                            onClick={onViewDocs}
                        >
                            View Documentation
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
