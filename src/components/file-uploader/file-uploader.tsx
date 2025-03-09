"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FileUploaderProps = {
  onFileUpload?: (file: File) => void;
  maxSizeMB?: number;
  acceptedFileTypes?: string[];
};

export default function FileUploader({
  onFileUpload,
  maxSizeMB = 50, // Default max size 100MB
  acceptedFileTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"], // Default accepted video types
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File too large. Maximum size is ${maxSizeMB}MB`);
      return false;
    }

    // Check file type
    if (acceptedFileTypes.length && !acceptedFileTypes.includes(file.type)) {
      toast.error(
        `Invalid file type. Accepted types: ${acceptedFileTypes.join(", ")}`
      );
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setFile(file);
      onFileUpload?.(file);
      toast.success("File successfully uploaded!");
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    toast.info("File removed");
  };

  return (
    <Card
      className={`w-full border-2 border-dashed transition-all ${
        isDragging ? "border-primary bg-muted/30" : "border-muted-foreground/25"
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
        {file ? (
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3 overflow-hidden">
                <Upload className="h-6 w-6 flex-shrink-0 text-muted-foreground" />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>

            {file.type.startsWith("video/") && (
              <div className="relative overflow-hidden rounded-lg border aspect-video">
                <video
                  src={URL.createObjectURL(file)}
                  controls
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-muted/30 p-4">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Drag and drop your video
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Drag and drop your video file here, or click to browse your
                files
              </p>
              <p className="text-xs text-muted-foreground">
                Accepted formats: {acceptedFileTypes.join(", ")} (Max:{" "}
                {maxSizeMB}MB)
              </p>
            </div>
            <label className="cursor-pointer">
              <Button
                variant="outline"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = acceptedFileTypes.join(",");
                  input.onchange = (e: Event) => {
                    handleFileChange(
                      e as unknown as React.ChangeEvent<HTMLInputElement>
                    );
                  };
                  input.click();
                }}
              >
                Choose file
              </Button>
              <input
                type="file"
                className="hidden"
                accept={acceptedFileTypes.join(",")}
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
