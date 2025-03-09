"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import { FileUploader } from "@/components/file-uploader";
import { ModeToggle } from "@/components/mode-toggle";

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Here you would typically handle the upload to your backend
    console.log("File uploaded:", file);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-8">Upload Waffle 🧇</h1>
        <ModeToggle />
      </div>
      <div className="max-w-3xl mx-auto">
        <FileUploader
          onFileUpload={handleFileUpload}
          maxSizeMB={100}
          acceptedFileTypes={[
            "video/mp4",
            "video/quicktime",
            "video/x-msvideo",
            "video/heic",
          ]}
        />

        {uploadedFile && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Ready to upload:{" "}
              <span className="font-medium">{uploadedFile.name}</span>
            </p>
            {/* Additional upload actions would go here */}
          </div>
        )}
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
