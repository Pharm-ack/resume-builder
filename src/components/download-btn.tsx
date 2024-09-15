"use client";
import { Button } from "./ui/button";

export default function DownloadBtn() {
  const HandleDownload = () => {
    window.print();
  };
  return (
    <div className="my-10 flex justify-between px-44">
      <Button onClick={HandleDownload}>Download</Button>
    </div>
  );
}
