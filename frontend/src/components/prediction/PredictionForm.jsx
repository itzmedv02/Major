import { Droplets } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { stateSubdivisions, states } from "@/data/regions";

const PredictionForm = ({
    selectedState,
    onStateChange,
    selectedSubdivision,
    onSubdivisionChange,
    selectedYear,
    onYearChange,
    onPredict,
    loading = false,
}) => {
    const availableSubdivisions = selectedState ? stateSubdivisions[selectedState] : [];

    const handleStateChange = (state) => {
        onStateChange(state);
        onSubdivisionChange(""); // Reset subdivision when state changes
    };

    const isPredictable = selectedSubdivision && selectedYear;

    return (
        <Card className="border-none shadow-elegant">
            <CardHeader>
                <CardTitle>Input Parameters</CardTitle>
                <CardDescription>
                    Choose subdivision and year for rainfall prediction
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={selectedState} onValueChange={handleStateChange}>
                        <SelectTrigger id="state">
                            <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                            {states.map((state) => (
                                <SelectItem key={state} value={state}>
                                    {state}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="subdivision">Region/Subdivision</Label>
                    <Select
                        value={selectedSubdivision}
                        onValueChange={onSubdivisionChange}
                        disabled={!selectedState}
                    >
                        <SelectTrigger id="subdivision">
                            <SelectValue
                                placeholder={selectedState ? "Select a region" : "Select state first"}
                            />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                            {availableSubdivisions.map((sub) => (
                                <SelectItem key={sub} value={sub}>
                                    {sub}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select value={selectedYear} onValueChange={onYearChange}>
                        <SelectTrigger id="year">
                            <SelectValue placeholder="Select a year" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                            {Array.from({ length: 20 }, (_, i) => 2016 + i).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    className="w-full shadow-lg"
                    size="lg"
                    onClick={onPredict}
                    disabled={!isPredictable || loading}
                >
                    {loading ? "Analyzing Data..." : "Predict Rainfall"}
                    {!loading && <Droplets className="ml-2 w-5 h-5" />}
                </Button>
            </CardContent>
        </Card>
    );
};

export default PredictionForm;
