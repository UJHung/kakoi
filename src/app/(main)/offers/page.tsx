import React, { Suspense } from "react";

import OffersClient from "./OffersClient";

export default function OffersPage() {
  return (
    <Suspense
      fallback={
        <div className="p-5">
          <div className="grid animate-pulse gap-6">
            <div className="h-[160px] rounded-xl bg-white/50" />
            <div className="h-[160px] rounded-xl bg-white/50" />
            <div className="h-[160px] rounded-xl bg-white/50" />
          </div>
        </div>
      }
    >
      <OffersClient />
    </Suspense>
  );
}
