"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
export type Data = {
  predicted_label: string;
  "Flow Duration": number;
  "Total Fwd Packets": number;
  "Total Backward Packets": number;
  "Fwd Packets Length Total": number;
  "Bwd Packets Length Total": number;
  "Fwd Packet Length Max": number;
  "Fwd Packet Length Mean": number;
  "Fwd Packet Length Std": number;
  "Bwd Packet Length Max": number;
  "Bwd Packet Length Mean": number;
  "Bwd Packet Length Std": number;
  "Flow Bytes/s": number;
  "Flow Packets/s": number;
  "Flow IAT Mean": number;
  "Flow IAT Std": number;
  "Flow IAT Max": number;
  "Flow IAT Min": number;
  "Fwd IAT Total": number;
  "Fwd IAT Mean": number;
  "Fwd IAT Std": number;
  "Fwd IAT Max": number;
  "Fwd IAT Min": number;
  "Bwd IAT Total": number;
  "Bwd IAT Mean": number;
  "Bwd IAT Std": number;
  "Bwd IAT Max": number;
  "Bwd IAT Min": number;
  "Fwd PSH Flags": number;
  "Fwd Header Length": number;
  "Bwd Header Length": number;
  "Fwd Packets/s": number;
  "Bwd Packets/s": number;
  "Packet Length Max": number;
  "Packet Length Mean": number;
  "Packet Length Std": number;
  "Packet Length Variance": number;
  "SYN Flag Count": number;
  "URG Flag Count": number;
  "Avg Packet Size": number;
  "Subflow Fwd Bytes": number;
  "Subflow Bwd Bytes": number;
  "Init Fwd Win Bytes": number;
  "Init Bwd Win Bytes": number;
  "Fwd Act Data Packets": number;
  "Fwd Seg Size Min": number;
  "Active Mean": number;
  "Active Std": number;
  "Active Max": number;
  "Active Min": number;
  "Idle Mean": number;
  "Idle Std": number;
  "Idle Max": number;
  "Idle Min": number;
};

const labels = [
  "Benign",
  "Botnet",
  "Bruteforce-FTP",
  "Bruteforce-SSH",
  "DDoS",
  "DDoS-DNS",
  "DDoS-Ddossim",
  "DDoS-HOIC",
  "DDoS-LDAP",
  "DDoS-LOIC-HTTP",
  "DDoS-MSSQL",
  "DDoS-NTP",
  "DDoS-NetBIOS",
  "DDoS-SNMP",
  "DDoS-Slowloris",
  "DDoS-Syn",
  "DDoS-TFTP",
  "DDoS-UDP",
  "DDoS-UDPLag",
  "DoS-Goldeneye",
  "DoS-Heartbleed",
  "DoS-Hulk",
  "DoS-Rudy",
  "DoS-Slowbody",
  "DoS-Slowheaders",
  "DoS-Slowhttptest",
  "DoS-Slowloris",
  "DoS-Slowread",
  "Infiltration",
  "Portscan",
  "Webattack-SQLi",
  "Webattack-XSS",
  "Webattack-bruteforce",
];

export const columns: ColumnDef<{ [key: string]: any }>[] = [
  {
    accessorKey: "predicted_label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const index = parseInt(row.original.predicted_label);
      return labels[index] || "Unknown";
    },
  },
  { accessorKey: "Flow Duration", header: "Flow Duration" },
  { accessorKey: "Total Fwd Packets", header: "Total Fwd Packets" },
  { accessorKey: "Total Backward Packets", header: "Total Backward Packets" },
  {
    accessorKey: "Fwd Packets Length Total",
    header: "Fwd Packets Length Total",
  },
  {
    accessorKey: "Bwd Packets Length Total",
    header: "Bwd Packets Length Total",
  },
  { accessorKey: "Fwd Packet Length Max", header: "Fwd Packet Length Max" },
  { accessorKey: "Fwd Packet Length Mean", header: "Fwd Packet Length Mean" },
  { accessorKey: "Fwd Packet Length Std", header: "Fwd Packet Length Std" },
  { accessorKey: "Bwd Packet Length Max", header: "Bwd Packet Length Max" },
  { accessorKey: "Bwd Packet Length Mean", header: "Bwd Packet Length Mean" },
  { accessorKey: "Bwd Packet Length Std", header: "Bwd Packet Length Std" },
  { accessorKey: "Flow Bytes/s", header: "Flow Bytes/s" },
  { accessorKey: "Flow Packets/s", header: "Flow Packets/s" },
  { accessorKey: "Flow IAT Mean", header: "Flow IAT Mean" },
  { accessorKey: "Flow IAT Std", header: "Flow IAT Std" },
  { accessorKey: "Flow IAT Max", header: "Flow IAT Max" },
  { accessorKey: "Flow IAT Min", header: "Flow IAT Min" },
  { accessorKey: "Fwd IAT Total", header: "Fwd IAT Total" },
  { accessorKey: "Fwd IAT Mean", header: "Fwd IAT Mean" },
  { accessorKey: "Fwd IAT Std", header: "Fwd IAT Std" },
  { accessorKey: "Fwd IAT Max", header: "Fwd IAT Max" },
  { accessorKey: "Fwd IAT Min", header: "Fwd IAT Min" },
  { accessorKey: "Bwd IAT Total", header: "Bwd IAT Total" },
  { accessorKey: "Bwd IAT Mean", header: "Bwd IAT Mean" },
  { accessorKey: "Bwd IAT Std", header: "Bwd IAT Std" },
  { accessorKey: "Bwd IAT Max", header: "Bwd IAT Max" },
  { accessorKey: "Bwd IAT Min", header: "Bwd IAT Min" },
  { accessorKey: "Fwd PSH Flags", header: "Fwd PSH Flags" },
  { accessorKey: "Fwd Header Length", header: "Fwd Header Length" },
  { accessorKey: "Bwd Header Length", header: "Bwd Header Length" },
  { accessorKey: "Fwd Packets/s", header: "Fwd Packets/s" },
  { accessorKey: "Bwd Packets/s", header: "Bwd Packets/s" },
  { accessorKey: "Packet Length Max", header: "Packet Length Max" },
  { accessorKey: "Packet Length Mean", header: "Packet Length Mean" },
  { accessorKey: "Packet Length Std", header: "Packet Length Std" },
  { accessorKey: "Packet Length Variance", header: "Packet Length Variance" },
  { accessorKey: "SYN Flag Count", header: "SYN Flag Count" },
  { accessorKey: "URG Flag Count", header: "URG Flag Count" },
  { accessorKey: "Avg Packet Size", header: "Avg Packet Size" },
  { accessorKey: "Subflow Fwd Bytes", header: "Subflow Fwd Bytes" },
  { accessorKey: "Subflow Bwd Bytes", header: "Subflow Bwd Bytes" },
  { accessorKey: "Init Fwd Win Bytes", header: "Init Fwd Win Bytes" },
  { accessorKey: "Init Bwd Win Bytes", header: "Init Bwd Win Bytes" },
  { accessorKey: "Fwd Act Data Packets", header: "Fwd Act Data Packets" },
  { accessorKey: "Fwd Seg Size Min", header: "Fwd Seg Size Min" },
  { accessorKey: "Active Mean", header: "Active Mean" },
  { accessorKey: "Active Std", header: "Active Std" },
  { accessorKey: "Active Max", header: "Active Max" },
  { accessorKey: "Active Min", header: "Active Min" },
  { accessorKey: "Idle Mean", header: "Idle Mean" },
  { accessorKey: "Idle Std", header: "Idle Std" },
  { accessorKey: "Idle Max", header: "Idle Max" },
  { accessorKey: "Idle Min", header: "Idle Min" },
];
