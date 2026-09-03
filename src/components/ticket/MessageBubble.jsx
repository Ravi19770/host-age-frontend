const MessageBubble = ({ message }) => {
  const isCustomer = message.sender === "customer";

  return (
    <div
      className={`flex ${
        isCustomer ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xl rounded-xl p-4 ${
          isCustomer
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        <h4 className="font-semibold">
          {message.name}
        </h4>

        <p className="mt-2">
          {message.message}
        </p>

        <span className="text-xs opacity-70 block mt-3">
          {message.time}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;