// All communication with the backend lives here. The backend is a Google
// Apps Script web app attached to your Sheet (see apps-script/Code.gs).
const URL = import.meta.env.VITE_APPS_SCRIPT_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;
import { toISO } from "../utils/date";
function assertConfigured() {
  if (!URL || !TOKEN) {
    throw new Error(
      "Missing VITE_APPS_SCRIPT_URL or VITE_API_TOKEN. Create .env.local (see .env.example) and restart npm run dev."
    );
  }
}

async function parse(res) {
  const data = await res.json().catch(() => {
    throw new Error("Backend did not return JSON. Check the Apps Script deployment settings.");
  });
  if (data && data.error) throw new Error(data.error);
  return data;
}

// "text/plain" avoids a browser preflight request, which Apps Script cannot answer.
async function post(payload) {
  assertConfigured();
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...payload, token: TOKEN }),
  });
  return parse(res);
}
export async function getJobs() {
  assertConfigured();
  const res = await fetch(`${URL}?token=${encodeURIComponent(TOKEN)}`);
  const jobs = await parse(res);
  return jobs.map((j) => ({ ...j, dateApplied: toISO(j.dateApplied) }));
}

export const addJob = (job) => post({ action: "add", job });
export const updateJob = (rowIndex, job) => post({ action: "update", rowIndex, job });
export const deleteJob = (rowIndex) => post({ action: "delete", rowIndex });
