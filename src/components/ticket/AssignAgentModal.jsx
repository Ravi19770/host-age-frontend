import { useState } from "react";

const agents = [
  "Rahul",
  "Neha",
  "Aman",
  "Rohit",
];

const AssignAgentModal = () => {
  const [agent, setAgent] = useState("");

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-lg font-semibold mb-5">
        Assign Agent
      </h2>

      <select
        className="w-full border rounded-lg p-3"
        value={agent}
        onChange={(e) => setAgent(e.target.value)}
      >
        <option value="">Select Agent</option>

        {agents.map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>

      <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Assign
      </button>

    </div>
  );
};

export default AssignAgentModal;