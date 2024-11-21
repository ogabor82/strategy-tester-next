"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BacktestResultsView from "@/components/BacktestResultsView";

export default function BacktestSession() {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/backtest-sessions/${params.id}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching backtest session:", error);
      }
    };

    fetchSession();
  }, [params.id]);

  if (!data) return <div>Loading...</div>;

  return <BacktestResultsView data={data} />;
}
