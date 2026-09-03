import { useState } from "react";

const InternalNotes = () => {
  const [note, setNote] = useState("");

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-lg font-semibold mb-4">
        Internal Notes
      </h2>

      <textarea
        rows="5"
        className="w-full border rounded-lg p-3"
        placeholder="Visible only to support agents..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
        Save Note
      </button>

    </div>
  );
};

export default InternalNotes;