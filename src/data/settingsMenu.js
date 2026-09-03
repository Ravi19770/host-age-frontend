import {
  User,
  Shield,
  Palette,
  Bell,
  Monitor,
  Link,
  AlertTriangle,
} from "lucide-react";

const settingsMenu = [
  {
    id: "general",
    name: "General",
    path: "/dashboard/settings/general",
  },
  {
    id: "security",
    name: "Security",
    path: "/dashboard/settings/security",
  },
  {
    id: "preferences",
    name: "Preferences",
    path: "/dashboard/settings/preferences",
  },
  {
    id: "notifications",
    name: "Notifications",
    path: "/dashboard/settings/notifications",
  },
  {
    id: "sessions",
    name: "Active Sessions",
    path: "/dashboard/settings/sessions",
  },
  {
    id: "accounts",
    name: "Connected Accounts",
    path: "/dashboard/settings/accounts",
  },
  {
    id: "danger",
    name: "Danger Zone",
    path: "/dashboard/settings/danger",
  },
];

export default settingsMenu;