import DownloadBtn from "@/components/download-btn";
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

export const metadata = {
  title: "Resume Download",
};

export default function page() {
  return (
    <>
      <div id="no-print">
        <div className="mx-10 my-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generates Resume is ready !{" "}
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share unique
            resume url with your friends and family{" "}
          </p>
          <DownloadBtn />
        </div>
      </div>
      <div className="mx-10 my-10 md:mx-20 lg:mx-36">
        <div id="print-area" className="resume-container">
          <Suspense fallback={<LoadingSpinner />}>
            <PreviewSection />
          </Suspense>
        </div>
      </div>
    </>
  );
}
