import { useState } from "react";
import { toast } from "sonner";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import InfoSection from "@/components/home/InfoSection";
import PredictionForm from "@/components/prediction/PredictionForm";
import PredictionResult from "@/components/prediction/PredictionResult";
import RainfallChart from "@/components/prediction/RainfallChart";
import Footer from "@/components/layout/Footer";
import { predictRainfall } from "@/services/predictionService";

const Index = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedSubdivision, setSelectedSubdivision] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [predictionData, setPredictionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedSubdivision("");
    setPredictionData(null);
  };

  const handleSubdivisionChange = (subdivision) => {
    setSelectedSubdivision(subdivision);
    setPredictionData(null);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setPredictionData(null);
  };

  const handlePredict = async () => {
    if (!selectedSubdivision || !selectedYear) {
      toast.error("Please select a region and year first.");
      return;
    }

    try {
      setIsLoading(true);
      const data = await predictRainfall(selectedState, selectedSubdivision, selectedYear);
      setPredictionData(data);
      toast.success("Prediction generated successfully!");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to generate prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToPrediction = () => {
    document.getElementById("prediction-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDocs = () => {
    // In a real app, this would route to a docs page. For now, scroll to About.
    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <HeroSection onGetStarted={scrollToPrediction} onViewDocs={scrollToDocs} />
      
      <StatsSection />

      {/* Prediction Section */}
      <section id="prediction-section" className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Make a Prediction</h2>
            <p className="text-muted-foreground text-lg">
              Select a subdivision and year to predict rainfall patterns
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PredictionForm
              selectedState={selectedState}
              onStateChange={handleStateChange}
              selectedSubdivision={selectedSubdivision}
              onSubdivisionChange={handleSubdivisionChange}
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
              onPredict={handlePredict}
              loading={isLoading}
            />

            {predictionData && (
              <PredictionResult
                state={selectedState}
                subdivision={selectedSubdivision}
                year={selectedYear}
                data={predictionData}
              />
            )}
          </div>
        </div>
      </section>

      {/* Visualization Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Historical Data Analysis</h2>
            <p className="text-muted-foreground text-lg">
              Explore rainfall trends across different regions
            </p>
          </div>
          <RainfallChart />
        </div>
      </section>

      {/* About Section */}
      <div id="about-section">
        <InfoSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
