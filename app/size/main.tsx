"use client";
import React, { useState, ChangeEvent, MouseEvent, useCallback } from "react";
import { Upload } from "lucide-react";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";


// Types
interface ResizedImage {
  blob: Blob;
  url: string;
  filename: string;
  size: number;
}
type SizeUnit = "KB" | "MB";

const ImageResizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetSize, setTargetSize] = useState<number>(100);
  const [sizeUnit, setSizeUnit] = useState<SizeUnit>("KB");
  const [resizedImage, setResizedImage] = useState<ResizedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resizeImage = (
    file: File,
    targetSizeInBytes: number
  ): Promise<ResizedImage> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let quality = 0.9;
          let resizedBlob: Blob;

          const resizeAndCompress = async () => {
            let scale = 1;

            do {
              canvas.width = img.width * scale;
              canvas.height = img.height * scale;

              const ctx = canvas.getContext("2d");
              if (!ctx) {
                reject(new Error("Failed to get canvas context"));
                return;
              }

              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

              resizedBlob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((blob) => resolve(blob!), file.type, quality);
              });

              if (resizedBlob.size > targetSizeInBytes) {
                if (quality > 0.1) {
                  quality -= 0.1;
                } else {
                  scale *= 0.9;
                }
              }
            } while (
              resizedBlob.size > targetSizeInBytes &&
              (quality > 0.1 || scale > 0.1)
            );

            resolve({
              blob: resizedBlob,
              url: URL.createObjectURL(resizedBlob),
              filename: `resized_${file.name}`,
              size: resizedBlob.size,
            });
          };

          resizeAndCompress();
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        if (event.target?.result) {
          img.src = event.target.result as string;
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setResizedImage(null);
      setError(null);
    }
  };

  const handleResize = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    const targetSizeBytes =
      targetSize * (sizeUnit === "MB" ? 1024 * 1024 : 1024);
    try {
      const result = await resizeImage(selectedFile, targetSizeBytes);
      setResizedImage(result);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setResizedImage(null);
    }
  };

  2;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Resizer</h1>

      <div className="mb-4">
        <label htmlFor="file-upload" className="block mb-2">
          Select Image:
        </label>
        <div className="flex items-center">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Upload className="mr-2" />
            Upload Image
          </label>
          {selectedFile && <span className="ml-2">{selectedFile.name}</span>}
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4 ">
        <Input
          type="number"
          value={targetSize}
          onChange={(e) => setTargetSize(Number(e.target.value))}
          className="w-24"
        />
        <Select
          value={sizeUnit}
          onChange={(e) => setSizeUnit(e.target.value as SizeUnit)}
        >
          <option value="KB">KB</option>
          <option value="MB">MB</option>
        </Select>
      </div>

      <Button onClick={handleResize} className="mb-4">
        Resize Image
      </Button>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <p>{error}</p>
        </Alert>
      )}

      {resizedImage && (
        <div>
          <p>
            File resized successfully! New size:{" "}
            {(resizedImage.size / 1024).toFixed(2)} KB
          </p>
          <h2 className="text-xl font-semibold mb-2">Resized Image:</h2>
          <img
            src={resizedImage.url}
            alt="Resized"
            className="max-w-full h-auto mb-2"
          />
          <a
            href={resizedImage.url}
            download={resizedImage.filename}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Download Resized Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
