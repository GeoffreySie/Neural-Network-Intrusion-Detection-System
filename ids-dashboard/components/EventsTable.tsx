import React from "react";
import { PredictionResponse } from "@/components/FileUpload";
import { DataTable } from "@/table_components/data-table";
import { columns } from "@/table_components/columns";

interface OutputDisplayProps {
  data: PredictionResponse | null;
}

export const EventsTable: React.FC<OutputDisplayProps> = ({ data }) => {
  return (
    <div className="">
      {data ? (
        <div className="flex flex-col items-center px-4">
          <h2 className="text-lg font-bold text-neutral-300 font-sans mb-8">
            Analysis Results
          </h2>
          <div className="w-full 2xl:max-w-4xl xl:max-w-3xl lg:max-w-xl max-w-md mx-auto space-y-8">
            <div>
              <h2 className="text-base font-semibold text-gray-400 mb-2">
                Summary
              </h2>
              {data.summary.map((item, idx) => (
                <h3 className="text-gray-100 text-bold font-sans" key={idx}>
                  Total number of threats detected: {item.Value}
                </h3>
              ))}
            </div>

            {/* Detailed Events Table */}
            <div>
              <h3 className="text-base font-semibold text-gray-400 mb-2">
                True Positive Events
              </h3>
              <div className="overflow-auto">
                <DataTable columns={columns} data={data.data} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EventsTable;
