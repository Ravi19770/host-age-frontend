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

      {/* =====================================================
          SETTINGS
      ===================================================== */}
      <Route path="/dashboard/settings" element={<Settings />}>

        {/* /dashboard/settings
            automatically redirects to
            /dashboard/settings/general
        */}
        <Route
          index
          element={<Navigate to="general" replace />}
        />

        <Route
          path="general"
          element={<General />}
        />

        <Route
          path="security"
          element={<Security />}
        />

        <Route
          path="preferences"
          element={<Preferences />}
        />

        <Route
          path="notifications"
          element={<Notifications />}
        />

        <Route
          path="sessions"
          element={<ActiveSessions />}
        />

        <Route
          path="accounts"
          element={<ConnectedAccounts />}
        />

        <Route
          path="danger"
          element={<DangerZone />}
        />

      </Route>

    </Routes>
  );
}