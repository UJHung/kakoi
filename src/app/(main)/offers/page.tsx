import React, { Suspense } from "react";

import OffersClient from "./OffersClient";

export default function OffersPage() {
  return (
    <Suspense fallback={<div />}>
      <OffersClient />
    </Suspense>
  );
}
