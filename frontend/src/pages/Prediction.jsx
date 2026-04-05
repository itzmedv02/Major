import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { predictRainfall, getSubdivisions, exportPDF } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Prediction = () => {
  const [subdivisions, setSubdivisions] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      subdivision: '',
      year: new Date().getFullYear()
    }
  });

  useEffect(() => {
    // Fetch subdivisions on mount
    const fetchSubs = async () => {
      try {
        const res = await getSubdivisions();
        setSubdivisions(res.subdivisions || []);
      } catch (e) {
        toast({ title: 'Error', description: 'Could not load subdivisions', variant: 'destructive' });
      }
    };
    fetchSubs();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await predictRainfall(data);
      setResult(res);
      toast({ title: 'Success', description: 'Prediction generated successfully.' });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.error || 'Failed to predict', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!result) return;
    try {
      await exportPDF(result);
      toast({ title: 'Exported', description: 'PDF report downloaded.' });
    } catch (e) {
      toast({ title: 'Export Failed', description: 'Could not generate PDF.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Run Prediction</h1>
        <p className="text-muted-foreground mt-1">
          Select a region and year to generate a machine-learning powered rainfall forecast.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Parameters</CardTitle>
              <CardDescription>Input variables for the model</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subdivision">Subdivision / Region</Label>
                  <Select onValueChange={(val) => setValue('subdivision', val)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a region..." />
                    </SelectTrigger>
                    <SelectContent>
                      {subdivisions.map(sub => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Target Year</Label>
                  <Input 
                    id="year" 
                    type="number" 
                    {...register('year', { required: true, min: 1900, max: 2100 })} 
                  />
                  {errors.year && <span className="text-xs text-red-500">Enter a valid year</span>}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BarChart2 className="w-4 h-4 mr-2" />}
                  {loading ? 'Predicting...' : 'Generate Forecast'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="overflow-hidden border-primary/20 shadow-md">
                  <div className="bg-primary/5 p-6 border-b border-primary/10 flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-primary">
                        {result.predictedAnnual.toFixed(1)} mm
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Predicted Annual Rainfall for {result.metadata.subdivision} ({result.metadata.year})
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
                      <Download className="w-4 h-4" /> Export PDF
                    </Button>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="h-72 w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.seasonalData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="season" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip 
                            cursor={{fill: 'rgba(0,0,0,0.05)'}}
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}
                          />
                          <Bar dataKey="rainfall" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between text-sm border-t pt-4">
                      <span className="text-muted-foreground">Model Confidence:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {result.confidence}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
               <motion.div 
                 key="empty"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="h-full min-h-[400px] flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg p-12 text-center"
               >
                 <BarChart2 className="w-12 h-12 mb-4 opacity-20" />
                 <h3 className="text-lg font-medium">No Data Yet</h3>
                 <p className="text-sm mt-1 max-w-sm">
                   Fill out the parameters and click Generate Forecast to see the machine learning predictions.
                 </p>
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
