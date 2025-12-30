import React, { useCallback, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, Image as ImageIcon, Video, FileVideo } from 'lucide-react';

interface UploadMediaProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const UploadMedia: React.FC<UploadMediaProps> = ({ file, setFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    // Validate type
    if (!['image/png', 'image/jpeg', 'video/mp4'].includes(selectedFile.type)) {
      alert("Bestie, only PNG, JPG or MP4 allowed! 💅");
      return;
    }
    
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full space-y-3">
       <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Upload Media</h3>
      
      <div
        className={cn(
          "relative w-full h-64 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group",
          dragActive 
            ? "border-primary bg-primary/5 scale-[1.01]" 
            : "border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50",
          file ? "border-solid border-transparent p-0 bg-black" : "p-4"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".png,.jpg,.jpeg,.mp4"
          onChange={handleChange}
        />

        {file && previewUrl ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black/5">
            {file.type.startsWith('video') ? (
               <video src={previewUrl} className="w-full h-full object-contain" controls />
            ) : (
               <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
            )}
            
            <button
              onClick={removeFile}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all z-10 text-destructive"
            >
              <X size={20} />
            </button>
            
            <div className="absolute bottom-4 left-4 right-4 py-2 px-4 bg-black/60 backdrop-blur-md rounded-xl text-white text-xs truncate">
              {file.name}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-4 pointer-events-none">
            <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-gray-700">Click or Drag & Drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG or MP4 (Max 1 file)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
