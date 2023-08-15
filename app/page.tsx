import React from "react";
import CreateTask from "./components/CreateTask";
import Calendar from "./components/Calendar";

export default function Home() {
  return (
    <div className="bg-red-500 m-10">
      <Calendar />
    </div>
  );
}
