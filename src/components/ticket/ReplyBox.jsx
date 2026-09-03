import { useState } from "react";

import UploadZone from "../../components/ticket/UploadZone";
import AttachmentPreview from "../../components/ticket/AttachmentPreview";

const ReplyBox = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const sendReply = () => {
    if (!message.trim()) {
      alert("Please enter a reply.");
      return;
    }

    console.log("Reply:", message);
    console.log("Attachment:", file);

    // TODO:
    // Later you will replace the console.log with
    // an Axios POST request to your backend.

    alert("Reply submitted (currently console only).");

    setMessage("");
    setFile(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="font-bold text-xl mb-5">
        Reply
      </h3>

      <textarea
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border rounded-lg p-4"
        placeholder="Write your reply..."
      />

      <div className="flex justify-end mt-2">
        <span className="text-sm text-gray-400">
          {message.length}/5000
        </span>
      </div>

      <div className="mt-6">
        <UploadZone onFileChange={setFile} />
      </div>

      <AttachmentPreview
        file={file}
        remove={() => setFile(null)}
      />

      <button
        type="button"
        onClick={sendReply}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Send Reply
      </button>

    </div>
  );
};

export default ReplyBox;