"use client";

import React, { useState } from "react";
import FileUpload, { PredictionResponse } from "@/components/FileUpload";
import EventsTable from "@/components/EventsTable";

export default function Home() {
  const [result, setResult] = useState<PredictionResponse | null>(null);

  return (
    <div className="p-8 w-full min-h-screen mx-auto flex flex-col lg:flex-row items-center justify-center">
      <div className="w-fit flex items-center justify-center">
        <FileUpload onResult={setResult} />
      </div>
      <div className="py-12 w-fit">
        <EventsTable data={result} />
      </div>
    </div>
  );
}
