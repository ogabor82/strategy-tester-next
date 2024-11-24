"use client";

import React from "react";
import axios from "axios";

const TimeframeSets: React.FC = () => {
  type TimeframeSet = {
    id: number;
    name: string;
  };

  const [timeframeSets, setTimeframeSets] = React.useState<TimeframeSet[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTimeframeSets = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/timeframe-sets"
        );
        setTimeframeSets(response.data);
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
    fetchTimeframeSets();
  }, []);

  return (
    <div>
      <h1>Timeframe Sets</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {timeframeSets.map((timeframeSet) => (
          <li key={timeframeSet.id}>{timeframeSet.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimeframeSets;
