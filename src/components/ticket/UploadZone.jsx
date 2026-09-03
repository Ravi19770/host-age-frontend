import { UploadCloud } from "lucide-react";

const UploadZone = ({ onFileChange }) => {
  return (
    <label
      className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
    >
      <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />

      <p className="font-medium">
        Drag & Drop files here
      </p>

      <p className="text-sm text-gray-500">
        or click to browse
      </p>

      <input
        hidden
        type="file"
        onChange={(e) => onFileChange(e.target.files[0])}
      />
    </label>
  );
};

export default UploadZone;