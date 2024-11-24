import React from "react";
import { Task } from "./types";

interface GanttChartProps {
  tasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  // Évek és hónapok generálása
  const years = [2023, 2024];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="">
      <div className="min-w-full bg-gray-100 border">
        {/* Éves időtengely */}
        <div className="flex border-b">
          {years.map((year) => (
            <div
              key={year}
              className="flex-grow text-center font-bold py-2 border-r bg-gray-200"
            >
              {year}
            </div>
          ))}
        </div>

        {/* Havi időtengely */}
        <div className="flex border-b">
          {years.map((year) =>
            months.map((month) => (
              <div
                key={`${year}-${month}`}
                className="flex-grow text-center py-2 border-r"
              >
                {month}
              </div>
            ))
          )}
        </div>

        {/* Feladatok */}
        <div className="relative">
          {tasks.map((task, index) => {
            const taskStartYear = task.start.getFullYear();
            const taskStartMonth = task.start.getMonth();
            const taskEndYear = task.end.getFullYear();
            const taskEndMonth = task.end.getMonth();

            // Kalkuláld a pozíciókat (balra és szélesség)
            const left = ((taskStartYear - 2023) * 12 + taskStartMonth) * 8.33; // 8.33% havonta
            const width =
              ((taskEndYear - taskStartYear) * 12 +
                (taskEndMonth - taskStartMonth)) *
              8.33;

            return (
              <div
                key={task.id}
                className="absolute flex items-center"
                style={{
                  top: `${index * 50}px`, // Távolság a feladatok között
                  left: `${left}%`,
                  width: `${width}%`,
                }}
              >
                <div className="bg-blue-500 text-white px-2 py-1 rounded">
                  {task.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
