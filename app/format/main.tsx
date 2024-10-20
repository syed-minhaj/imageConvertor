"use client"
import React, { useState, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Select from '../components/ui/Select';

// Types
interface ConvertedImage {
  blob: Blob;
  url: string;
  filename: string;
}

// Image conversion function
const convertImageFormat = (imageFile: File, targetFormat: string): Promise<ConvertedImage> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    console.log(reader)
    reader.onload = function(event: ProgressEvent<FileReader>) {
      console.log(reader)
      const img = new Image();
      const aaa = img
      console.log(img)
      img.onload = function() {
        console.log(img)
        if(aaa == img){console.log(true)}else{console.log(false)}
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          let mimeType: string;
          let fileExtension: string;
          if (targetFormat.toLowerCase() === 'png') {
            mimeType = 'image/png';
            fileExtension = 'png';
          } else if (targetFormat.toLowerCase() === 'jpeg' || targetFormat.toLowerCase() === 'jpg') {
            mimeType = 'image/jpeg';
            fileExtension = 'jpg';
          } else {
            reject(new Error('Unsupported target format. Use "png" or "jpeg".'));
            return;
          }
          
          canvas.toBlob(function(blob) {
            if (blob) {
              resolve({
                blob: blob,
                url: URL.createObjectURL(blob),
                filename: `converted_image.${fileExtension}`
              });
            } else {
              reject(new Error('Failed to create blob'));
            }
          }, mimeType);
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };
      img.onerror = function() {
        reject(new Error('Failed to load image'));
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = function() {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(imageFile);
  });
};

// Main component
const ImageConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('png');
  const [convertedImage, setConvertedImage] = useState<ConvertedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setConvertedImage(null);
      setError(null);
    }
  };

  const handleFormatChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTargetFormat(event.target.value);
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    try {
      const result = await convertImageFormat(selectedFile, targetFormat);
      setConvertedImage(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setConvertedImage(null);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto ">
      <h1 className="text-2xl font-bold mb-4">Image Format Converter</h1>
      
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
          {selectedFile && (
            <span className="ml-2">{selectedFile.name}</span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="format-select" className="block mb-2">
          Target Format:
        </label>
        <Select
          id="format-select"
          value={targetFormat}
          onChange={handleFormatChange}
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
        </Select>
      </div>

      <Button onClick={handleConvert} className="mb-4">
        Convert Image
      </Button>

      {error && (
        <Alert variant="destructive" className="mb-4" >
          <p>{error}</p>
        </Alert>
      )}

      {convertedImage && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Converted Image:</h2>
          <img
            src={convertedImage.url}
            alt="Converted"
            className="max-w-full h-auto mb-2"
          />
          <a
            href={convertedImage.url}
            download={convertedImage.filename}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Download Converted Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;