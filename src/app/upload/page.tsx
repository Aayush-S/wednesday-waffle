"use client";

import { useState } from "react"; // TODO: Use useRef to upload file
// import { Toaster } from "sonner";
import { FileUploader } from "@/components/file-uploader";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
// import { type PutBlobResult } from "@vercel/blob";
// import { upload } from "@vercel/blob/client";
// import { twMerge } from "tailwind-merge";
// import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
// import { genUploader } from "uploadthing/client";
// import type { UploadRouter } from "~/server/uploadthing";
// export const { uploadFiles } = genUploader<UploadRouter>();
// import { upload } from "@vercel/blob";
import { useUploadThing } from "@/utils/uploadthing";
import { Input } from "@/components/ui/input";

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { startUpload, routeConfig } = useUploadThing("videoUploader", {
    onClientUploadComplete: () => {
      setUploadMessage("Uploaded successfully!");

      // TODO: Write to db with:
      // - group_id from input field
      // - user_id from auth session
      // - file_id from uploadthing response
      // - created_at timestamp
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      setUploadMessage("Uploading...");
      // TODO: Add a progress bar/spinner
    },
  });

  return (
    <div>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-8">Upload Waffle 🧇</h1>
          <ModeToggle />
        </div>
        <div className="max-w-md mx-auto">
          <FileUploader
            onFileUpload={handleFileUpload}
            maxSizeMB={100}
            acceptedFileTypes={[
              "video/mp4",
              "video/quicktime",
              "video/x-msvideo",
            ]}
          />
          <Input type="text" placeholder="Group ID" />
          {uploadedFile && (
            <div className="mt-6">
              <Button onClick={() => startUpload([uploadedFile])}>
                Upload
              </Button>
              <p>{uploadMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
