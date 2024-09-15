"use client";

import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center">
      <Loader className="h-8 w-8 animate-spin" />
    </div>
  );
}
