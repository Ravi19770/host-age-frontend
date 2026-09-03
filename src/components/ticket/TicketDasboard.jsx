import { useEffect, useState } from "react";
import axios from "axios";

import TicketTable from "../../components/Admin/TicketTable";

const TicketDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tickets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Tickets =>", res.data);

      setTickets(res.data.tickets);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <TicketTable tickets={tickets} />
    </div>
  );
};

export default TicketDashboard;