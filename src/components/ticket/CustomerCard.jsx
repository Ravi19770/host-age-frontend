const CustomerCard = ({ ticket }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-lg font-semibold mb-4">
        Customer
      </h2>

      <div className="space-y-3">

        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">
            {ticket.User?.fullName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">
            {ticket.User?.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Company</p>
          <p className="font-medium">
            {ticket.User?.company || "N/A"}
          </p>
        </div>

      </div>

    </div>
  );
};

export default CustomerCard;