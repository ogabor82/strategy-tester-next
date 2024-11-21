"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import Link from "next/link";

interface Strategy {
  id: number;
  name: string;
  details: string;
}

export default function Strategies() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/strategies");
        const data = await response.json();
        setStrategies(data);
      } catch (error) {
        console.error("Error fetching strategies:", error);
      }
    };

    fetchStrategies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Strategies
      </Typography>
      <Grid container spacing={3}>
        {strategies.map((strategy) => (
          <Grid item xs={12} sm={6} md={4} key={strategy.id}>
            <Link
              href={`/strategies/${strategy.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6">{strategy.name}</Typography>
                  <Typography color="textSecondary">
                    {strategy.details}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
