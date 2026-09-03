import { NavLink } from "react-router-dom";
import settingsMenu from "../../../data/settingsMenu";

const SettingsSidebar = () => {
  return (
    <aside className="w-72 shrink-0">
      <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
        {settingsMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.end ?? false}
              className={({ isActive }) =>
                [
                  "mb-2 flex items-center gap-3 rounded-lg px-4 py-3",
                  "text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100",
                ].join(" ")
              }
            >
              <Icon size={20} strokeWidth={2} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default SettingsSidebar;