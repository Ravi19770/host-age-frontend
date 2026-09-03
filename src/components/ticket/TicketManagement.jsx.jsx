import { useState, useEffect } from "react";
import axios from "axios";

const TicketManagement = ({ ticket }) => {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setPriority(ticket.priority);
      setDepartment(ticket.department);
    }
  }, [ticket]);

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/tickets/${ticket.id}`,
        {
          status,
          priority,
          department,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Ticket updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update ticket");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-lg font-semibold mb-5">
        Ticket Management
      </h2>

      <div className="space-y-4">

        <div>
          <label className="block mb-2 font-medium">Status</label>

          <select
            className="w-full border rounded-lg p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Open</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Priority</label>

          <select
            className="w-full border rounded-lg p-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Department</label>

          <select
            className="w-full border rounded-lg p-2"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option>Technical</option>
            <option>Billing</option>
            <option>Domains</option>
            <option>Sales</option>
            <option>Email</option>
          </select>
        </div>

        <button
          onClick={saveChanges}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
};

export default TicketManagement;