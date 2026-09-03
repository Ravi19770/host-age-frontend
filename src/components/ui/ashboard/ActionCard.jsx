import { Link } from "react-router-dom";

export default function ActionCard({
  title,
  description,
  icon: Icon,
  color,
  link,
}) {
  return (
    <Link
      to={link}
      className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-gray-100"
    >
      <div
        className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white mb-4`}
      >
        <Icon size={24} />
      </div>

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2">
        {description}
      </p>
    </Link>
  );
}