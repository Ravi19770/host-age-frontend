import { X } from "lucide-react";

const AttachmentPreview = ({ file, remove }) => {
  if (!file) return null;

  return (
    <div className="mt-4 border rounded-lg p-4 flex justify-between items-center">

      <div>

        <p className="font-medium">
          {file.name}
        </p>

        <p className="text-sm text-gray-500">
          {(file.size / 1024).toFixed(1)} KB
        </p>

      </div>

      <button
        onClick={remove}
      >
        <X />
      </button>

    </div>
  );
};

export default AttachmentPreview;