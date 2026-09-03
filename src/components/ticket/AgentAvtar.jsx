const AgentAvatar = ({ agent }) => {
  return (
    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
        {agent.charAt(0)}
      </div>

      <span>{agent}</span>

    </div>
  );
};

export default AgentAvatar;