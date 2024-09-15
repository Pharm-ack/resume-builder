import FormSection from "@/components/resumePreview/form-section";

import { Suspense } from "react";

import dynamic from "next/dynamic";

const LoadingSpinner = dynamic(() => import("@/components/loading-spinner"), {
  ssr: false,
});
const PreviewSection = dynamic(
  () => import("@/components/resumePreview/preview-section"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
);

export default function EditPage() {
  return (
    <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
      <FormSection />
      <Suspense fallback={<LoadingSpinner />}>
        <PreviewSection />
      </Suspense>
    </div>
  );
}
