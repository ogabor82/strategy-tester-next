"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BacktestResultsView from "@/components/BacktestResultsView";

export default function Strategy() {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStrategy = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/strategies/${params.id}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching strategy:", error);
      }
    };

    fetchStrategy();
  }, [params.id]);

  if (!data) return <div>Loading...</div>;

  return <BacktestResultsView data={data} />;
}
