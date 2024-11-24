"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";

type OptimizationResult = {
  id: number;
  ticker: string;
  strategy_id: number;
  optimization_session_id: number;
  optimization_results: string;
  start: string;
  end: string;
  interval: string;
  timeframe_id: number | null;
};

interface OptimizationResultsViewProps {
  data: OptimizationResult[];
}

export default function OptimizationResultsView({
  data,
}: OptimizationResultsViewProps) {
  const columns: GridColDef<OptimizationResult>[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "ticker", headerName: "Ticker", width: 130 },
    { field: "strategy_id", headerName: "Strategy ID", width: 130 },
    {
      field: "optimization_results",
      headerName: "Parameters",
      width: 300,
    },
    { field: "interval", headerName: "Interval", width: 130 },
    { field: "start", headerName: "Start Time", width: 200 },
    { field: "end", headerName: "End Time", width: 200 },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Optimization Results
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
