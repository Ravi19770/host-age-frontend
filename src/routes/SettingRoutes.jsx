import { Routes, Route, Navigate } from "react-router-dom";

import Settings from "./pages/Settings/Settings";
import General from "./pages/Settings/General";
import Security from "./pages/Settings/Security";
import Preferences from "./pages/Settings/Preferences";
import Notifications from "./pages/Settings/Notifications";
import ActiveSessions from "./pages/Settings/ActiveSessions";
import ConnectedAccounts from "./pages/Settings/ConnectedAccounts";
import DangerZone from "./pages/Settings/DangerZone";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Dashboard Settings */}
      <Route path="/dashboard/settings" element={<Settings />}>

        {/* /dashboard/settings */}
        <Route
          index
          element={<Navigate to="general" replace />}
        />

        {/* /dashboard/settings/general */}
        <Route
          path="general"
          element={<General />}
        />

        {/* /dashboard/settings/security */}
        <Route
          path="security"
          element={<Security />}
        />

        {/* /dashboard/settings/preferences */}
        <Route
          path="preferences"
          element={<Preferences />}
        />

        {/* /dashboard/settings/notifications */}
        <Route
          path="notifications"
          element={<Notifications />}
        />

        {/* /dashboard/settings/sessions */}
        <Route
          path="sessions"
          element={<ActiveSessions />}
        />

        {/* /dashboard/settings/accounts */}
        <Route
          path="accounts"
          element={<ConnectedAccounts />}
        />

        {/* /dashboard/settings/danger */}
        <Route
          path="danger"
          element={<DangerZone />}
        />

      </Route>

    </Routes>
  );
}