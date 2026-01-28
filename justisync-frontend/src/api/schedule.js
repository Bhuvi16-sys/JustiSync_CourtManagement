// src/api/schedule.js

import { fetchClient } from "../utils/fetchClient";

export const getSchedule = async () => {
  return fetchClient("/schedule", "GET");
};

export const createSchedule = async (data) => {
  return fetchClient("/schedule", "POST", data);
};

export const updateSchedule = async (scheduleId, data) => {
  return fetchClient(`/schedule/${scheduleId}`, "PUT", data);
};

export const deleteSchedule = async (scheduleId) => {
  return fetchClient(`/schedule/${scheduleId}`, "DELETE");
};
