"use client";

import React from "react";
import axios from "axios";
import { CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { Card } from "@mui/material";

const OptimizationSessions: React.FC = () => {
  type OptimizationSession = {
    id: number;
    name: string;
  };

  const [optimizationSessions, setOptimizationSessions] = React.useState<
    OptimizationSession[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchOptimizationSessions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/optimization-sessions"
        );
        setOptimizationSessions(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchOptimizationSessions();
  }, []);

  return (
    <div>
      <h1>Optimization Sessions</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {optimizationSessions.map((optimizationSession) => (
          <Link
            href={`/optimization-sessions/${optimizationSession.id}`}
            style={{ textDecoration: "none" }}
            key={optimizationSession.id}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">{optimizationSession.name}</Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default OptimizationSessions;
