// src/api/cases.js

import { fetchClient } from "../utils/fetchClient";

export const getCases = async () => {
  return fetchClient("/cases", "GET");
};

export const getCaseById = async (caseId) => {
  return fetchClient(`/cases/${caseId}`, "GET");
};

export const createCase = async (caseData) => {
  return fetchClient("/cases", "POST", caseData);
};

export const updateCase = async (caseId, caseData) => {
  return fetchClient(`/cases/${caseId}`, "PUT", caseData);
};

export const deleteCase = async (caseId) => {
  return fetchClient(`/cases/${caseId}`, "DELETE");
};
