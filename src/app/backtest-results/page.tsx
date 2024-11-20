"use client";

import React from "react";
import axios from "axios";

const BacktestResults: React.FC = () => {
  type BacktestResult = {
    backtest_session_id: number;
    buyhold_return: number;
    configuration_id: string;
    end: string;
    id: number;
    interval: string;
    kelly_criterion: number;
    max_drawdown: number;
    return: number;
    sharpe_ratio: number;
    start: string;
    strategy_id: number;
    ticker: string;
    trades: number;
    win_rate: number;
  };

  const [data, setData] = React.useState<BacktestResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<unknown>(null);

  React.useEffect(() => {
    const fetchBacktestResults = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.13:5000/backtest-results"
        );
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBacktestResults();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Backtest Results</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Ticker</th>
            <th className="py-2 px-4 border-b">Strategy ID</th>
            <th className="py-2 px-4 border-b">Start</th>
            <th className="py-2 px-4 border-b">End</th>
            <th className="py-2 px-4 border-b">Interval</th>
            <th className="py-2 px-4 border-b">Trades</th>
            <th className="py-2 px-4 border-b">Win Rate</th>
            <th className="py-2 px-4 border-b">Return</th>
            <th className="py-2 px-4 border-b">Buy & Hold Return</th>
            <th className="py-2 px-4 border-b">Max Drawdown</th>
            <th className="py-2 px-4 border-b">Sharpe Ratio</th>
            <th className="py-2 px-4 border-b">Kelly Criterion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.ticker}</td>
              <td className="py-2 px-4 border-b">{item.strategy_id}</td>
              <td className="py-2 px-4 border-b">{item.start}</td>
              <td className="py-2 px-4 border-b">{item.end}</td>
              <td className="py-2 px-4 border-b">{item.interval}</td>
              <td className="py-2 px-4 border-b">{item.trades}</td>
              <td className="py-2 px-4 border-b">{item.win_rate}%</td>
              <td className="py-2 px-4 border-b">{item.return}</td>
              <td className="py-2 px-4 border-b">{item.buyhold_return}</td>
              <td className="py-2 px-4 border-b">{item.max_drawdown}%</td>
              <td className="py-2 px-4 border-b">{item.sharpe_ratio}</td>
              <td className="py-2 px-4 border-b">{item.kelly_criterion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BacktestResults;
