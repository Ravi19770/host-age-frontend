import api from "./axios";

// ==========================================
// GET NOTIFICATION SETTINGS
// ==========================================
export const getNotificationSettings = async () => {
  const response = await api.get(
    "/api/settings/notifications"
  );

  return response.data;
};

// ==========================================
// UPDATE NOTIFICATION SETTINGS
// ==========================================
export const updateNotificationSettings = async (
  settings
) => {
  const response = await api.put(
    "/api/settings/notifications",
    settings
  );

  return response.data;
};