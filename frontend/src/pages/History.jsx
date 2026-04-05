import React, { useEffect, useState } from 'react';
import { getHistory } from '@/services/api';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prediction History</h1>
        <p className="text-muted-foreground mt-1">
          Review previously generated predictions stored securely.
        </p>
      </div>

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
