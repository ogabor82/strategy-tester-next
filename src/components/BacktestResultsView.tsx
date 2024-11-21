"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";

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

interface BacktestResultsViewProps {
  data: {
    results: BacktestResult[];
  };
}

export default function BacktestResultsView({
  data,
}: BacktestResultsViewProps) {
  console.log(data);
  const columns: GridColDef<BacktestResult>[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "ticker", headerName: "Ticker", width: 130 },
    { field: "interval", headerName: "Interval", width: 130 },
    {
      field: "return",
      headerName: "Return",
      width: 130,
      type: "number",
    },
    {
      field: "buyhold_return",
      headerName: "Buy & Hold Return",
      width: 130,
      type: "number",
    },
    {
      field: "win_rate",
      headerName: "Win Rate",
      width: 130,
      type: "number",
    },
    {
      field: "trades",
      headerName: "Trades",
      width: 130,
      type: "number",
    },
    {
      field: "sharpe_ratio",
      headerName: "Sharpe Ratio",
      width: 130,
      type: "number",
    },
    {
      field: "max_drawdown",
      headerName: "Max Drawdown",
      width: 130,
      type: "number",
    },
    { field: "start", headerName: "Start Time", width: 200 },
    { field: "end", headerName: "End Time", width: 200 },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Backtest Results
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          mb: 4,
        }}
      ></Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Results History
      </Typography>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
        />
      </div>
    </Box>
  );
}
