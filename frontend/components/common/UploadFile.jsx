import { useDropzone } from "react-dropzone";
import { Upload } from 'lucide-react';
import { cn } from "../../src/assets/ีutils/tw-merge";

export default function FileUploadDropzone({
  onDrop,
  accept,
  maxFiles = 1,
  inputName,
}) {
  const { getInputProps, getRootProps, isDragActive, isDragReject } =
    useDropzone({
      accept,
      onDrop,
      maxFiles,
      multiple: true
    });

  return (
    <div
      className={cn(
        "h-37.5 flex flex-col items-center justify-center text-center border rounded-md border-dashed border-[#D5D5D5] cursor-pointer",
        isDragActive ? "border-emerald-500" : "",
        isDragReject ? "border-red-500" : ""
      )}
      {...getRootProps()}
    >
      <input name={inputName} {...getInputProps()} />
      <Upload />
      <p className="leading-10 text-sm font-light">
        Click or drag file to this area to upload
      </p>
    </div>
  );
}
