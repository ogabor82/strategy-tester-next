"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import OptimizationResultsView from "@/components/OptimizationResultsView";

export default function OptimizationSession() {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch(
        `http://127.0.0.1:5000/optimization-sessions/${params.id}`
      );
      const result = await response.json();
      setData(result);
    };
    fetchSession();
  }, [params.id]);

  if (!data) return <div>Loading...</div>;

  return <OptimizationResultsView data={data} />;
}
