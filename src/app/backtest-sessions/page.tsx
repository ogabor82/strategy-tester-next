"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import Link from "next/link";

interface BacktestSession {
  id: number;
  name: string;
  details: string;
}

export default function BacktestSessions() {
  const [sessions, setSessions] = useState<BacktestSession[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/backtest-sessions");
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Error fetching backtest sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Backtest Sessions
      </Typography>
      <Grid container spacing={3}>
        {sessions.map((session) => (
          <Grid item xs={12} sm={6} md={4} key={session.id}>
            <Link
              href={`/backtest-sessions/${session.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6">{session.name}</Typography>
                  <Typography color="textSecondary">
                    {session.details}
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
