import { Paperclip } from "lucide-react";

const AttachmentCard = ({ attachment }) => {
  return (
    <div className="mt-3 border rounded-lg p-3 flex justify-between items-center">

      <div className="flex items-center gap-3">

        <Paperclip />

        <div>

          <p>{attachment.name}</p>

          <small>{attachment.size}</small>

        </div>

      </div>

      <button
        className="text-blue-600"
      >
        Download
      </button>

    </div>
  );
};

export default AttachmentCard;