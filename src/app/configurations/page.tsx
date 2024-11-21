"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Configuration {
  id: number;
  name: string;
  start: string;
  end: string;
  interval: string;
}

export default function Configurations() {
  const [configurations, setConfigurations] = useState<Configuration[]>([]);

  useEffect(() => {
    const fetchConfigurations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/configurations");
        const data = await response.json();
        setConfigurations(data);
      } catch (error) {
        console.error("Error fetching configurations:", error);
      }
    };

    fetchConfigurations();
  }, []);

  const columns: GridColDef<Configuration>[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "start", headerName: "Start", width: 130 },
    { field: "end", headerName: "End", width: 130 },
    { field: "interval", headerName: "Interval", width: 130 },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Configurations
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataGrid
              rows={configurations}
              columns={columns}
              paginationModel={{ page: 0, pageSize: 5 }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
