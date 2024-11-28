import { Suspense } from "react";

import { Poll } from "@/components/Poll";

export default function PollPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Poll />
    </Suspense>
  );
}