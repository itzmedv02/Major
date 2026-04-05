import React, { useEffect, useMemo, useState } from 'react';
import { getHistory } from '@/services/api';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIt = async () => {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };
    fetchIt();
  }, []);

  const stats = useMemo(() => {
    if (!history.length) {
      return null;
    }

    const values = history.map((run) => run.predictedAnnual);
    const total = values.length;
    const average = values.reduce((sum, value) => sum + value, 0) / total;
    const max = Math.max(...values);
    const min = Math.min(...values);

    return {
      total,
      average: average.toFixed(1),
      max: max.toFixed(1),
      min: min.toFixed(1),
      chartData: history.map((run) => ({
        date: new Date(run.created_at).toLocaleDateString(),
        predictedAnnual: run.predictedAnnual,
      }))
    };
  }, [history]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prediction History</h1>
        <p className="text-muted-foreground mt-1">
          Review previously generated predictions stored securely.
        </p>
      </div>

      {stats && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Forecast Count</CardTitle>
              <CardDescription>Total predictions saved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Annual</CardTitle>
              <CardDescription>Mean predicted rainfall</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{stats.average} mm</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Range</CardTitle>
              <CardDescription>Min / Max predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{stats.min} mm / {stats.max} mm</div>
            </CardContent>
          </Card>
        </div>
      )}

      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Prediction Trend</CardTitle>
            <CardDescription>Recent annual rainfall predictions over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="predictedAnnual" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Runs</CardTitle>
            <CardDescription>A list of the latest prediction endpoints hit.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                No history found. Go make a prediction!
              </div>
            ) : (
              <Table>
                <TableCaption>A list of your recent predictions.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Subdivision</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">Predicted (Annual)</TableHead>
                    <TableHead className="text-right">Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((run) => (
                    <TableRow key={run.id}>
                      <TableCell className="font-medium">
                        {new Date(run.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{run.subdivision}</TableCell>
                      <TableCell>{run.year}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {run.predictedAnnual.toFixed(1)} mm
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={run.confidence > 80 ? 'default' : 'secondary'}>
                          {run.confidence}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default History;
