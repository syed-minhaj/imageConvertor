"use client";
import React, { useState, useCallback } from "react";
import Button from "../components/ui/Button";
import { Upload } from "lucide-react";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

const Alert: React.FC<{
  variant?: "default" | "destructive";
  children: React.ReactNode;
}> = ({ variant = "default", children }) => (
  <div
    className={`  ${
      variant === "destructive"
        ? "bg-red-100 border-red-500 text-red-700 p-4"
        : " "
    }`}
  >
    {children}
  </div>
);

interface ResizedImage {
  blob: Blob;
  url: string;
  filename: string;
  size: number;
}
type SizeUnit = "KB" | "MB";

const FileResizeConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetSize, setTargetSize] = useState<number>(100);
  const [sizeUnit, setSizeUnit] = useState<SizeUnit>("KB");
  const [resizedFile, setResizedFile] = useState<ResizedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResizedFile(null);
      setError(null);
    }
  };

  const resizeFile = useCallback(async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const targetSizeInBytes =
      targetSize * (sizeUnit === "MB" ? 1024 * 1024 : 1024);

    try {
      const image = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Unable to create canvas context");
      }

      let quality = 0.9;
      let resizedBlob: Blob;

      do {
        const scale = Math.sqrt(targetSizeInBytes / file.size);
        canvas.width = image.width * scale;
        canvas.height = image.height * scale;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        resizedBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), file.type, quality);
        });

        quality -= 0.1;
      } while (resizedBlob.size > targetSizeInBytes && quality > 0.1);

      const resizedFile = new File([resizedBlob], file.name, {
        type: file.type,
      });

      setResizedFile({
        blob: resizedBlob,
        url: URL.createObjectURL(resizedBlob),
        filename: `resized_${file.name}`,
        size: resizedFile.size,
      });
    } catch (err) {
      setError(
        "Error resizing file. Please try again with a different file or target size."
      );
    }
  }, [file, targetSize, sizeUnit]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Image Resizer</h1>
      <div className="flex items-center ">
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
        {file && <span className="ml-2">{file.name}</span>}
      </div>

      <div className="flex items-center space-x-2">
        <Input
          type="number"
          value={targetSize}
          onChange={(e: { target: { value: any } }) =>
            setTargetSize(Number(e.target.value))
          }
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

      <Button
        onClick={resizeFile}
        className=" flex items-center justify-center"
      >
        Resize Image
      </Button>

      {error && (
        <Alert variant="destructive">
          <p>{error}</p>
        </Alert>
      )}

      {resizedFile && (
        <Alert>
          <p>
            Image resized successfully! New size:{" "}
            {(resizedFile.size / 1024).toFixed(2)} KB
          </p>
          <div>
            <h2 className="text-xl font-semibold mb-2">Resized Image:</h2>
            <img
              src={resizedFile.url}
              alt="Resized"
              className="max-w-full h-auto mb-2"
            />
            <a
              href={resizedFile.url}
              download={resizedFile.filename}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Download Resized Image
            </a>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default FileResizeConverter;
