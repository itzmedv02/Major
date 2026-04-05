import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RainfallChart = () => {
  // Sample data representing rainfall trends
  const data = [
    { year: '1901', annual: 3373, monsoon: 1696 },
    { year: '1920', annual: 3150, monsoon: 1580 },
    { year: '1940', annual: 3280, monsoon: 1720 },
    { year: '1960', annual: 3420, monsoon: 1850 },
    { year: '1980', annual: 3190, monsoon: 1690 },
    { year: '2000', annual: 3350, monsoon: 1780 },
    { year: '2015', annual: 3400, monsoon: 1820 },
  ];

  return (
    <Card className="border-none shadow-elegant">
      <CardHeader>
        <CardTitle>Rainfall Trends Over Time</CardTitle>
        <CardDescription>
          Annual and monsoon rainfall patterns (in mm) for Andaman & Nicobar Islands
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="year" 
              stroke="hsl(var(--foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--foreground))"
              style={{ fontSize: '12px' }}
              label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="annual" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              name="Annual Rainfall"
              dot={{ fill: 'hsl(var(--primary))', r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="monsoon" 
              stroke="hsl(var(--accent))" 
              strokeWidth={3}
              name="Monsoon Rainfall"
              dot={{ fill: 'hsl(var(--accent))', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RainfallChart;
