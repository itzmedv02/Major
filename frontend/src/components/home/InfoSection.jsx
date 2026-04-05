import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const InfoSection = () => {
    return (
        <section className="py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
                <Card className="border-none shadow-elegant">
                    <CardHeader>
                        <CardTitle className="text-2xl">About the Project</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                            Heavy rainfall prediction is a major challenge for meteorological
                            departments is closely associated with the economy and life of
                            humans. It is a cause for natural disasters like floods and droughts
                            which are encountered by people across the globe every year.
                        </p>
                        <p>
                            Accuracy of rainfall forecasting has great importance for countries like
                            India whose economy is largely dependent on agriculture. Due to the
                            dynamic nature of the atmosphere, statistical techniques fail to provide
                            good accuracy for rainfall forecasting.
                        </p>
                        <p>
                            This system uses machine learning algorithms to analyze subdivision-wise
                            monthly rainfall data for 115 years (1901-2015) to make accurate
                            predictions about future rainfall patterns.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default InfoSection;
