import { Routes, Route } from "react-router-dom";

import MyTickets from "../pages/tickets/MyTickets";
import CreateTicket from "../pages/tickets/CreateTicket";
import TicketDetails from "../pages/tickets/TicketDetails";
import AdminTicketView from "../pages/tickets/AdminTicketView";

const TicketRoutes = () => {
  return (
    <Routes>
      <Route index element={<MyTickets />} />
      <Route path="create" element={<CreateTicket />} />
      <Route path=":ticketId" element={<TicketDetails />} />
      <Route path="admin/:id" element={<AdminTicketView />} />

    
    
    </Routes>
  );
};

export default TicketRoutes;