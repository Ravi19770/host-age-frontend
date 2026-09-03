import api from "../api/axios";

export const getNotificationSettings = async () => {
  const response = await api.get(
    "/api/settings/notifications"
  );

  return response.data;
};

export const updateNotificationSettings = async (
  settings
) => {
  const response = await api.put(
    "/api/settings/notifications",
    settings
  );

  return response.data;
};