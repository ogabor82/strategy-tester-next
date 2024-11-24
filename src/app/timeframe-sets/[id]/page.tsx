"use client";

import GanttChart from "./GanttChart";

export default function TimeFrameSet() {
  const tasks = [
    {
      id: 1,
      name: "Interval 1",
      start: new Date(2023, 0, 1),
      end: new Date(2023, 7, 15),
    },
    {
      id: 2,
      name: "Interval 2",
      start: new Date(2023, 3, 1),
      end: new Date(2024, 6, 30),
    },
  ];
  return (
    <div>
      <h1>TimeFrameSet</h1>
      <GanttChart tasks={tasks} />
    </div>
  );
}
