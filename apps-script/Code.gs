/**
 * Job Tracker backend - runs inside your Google Sheet (no keys needed).
 *
 * Columns in row 1: Company | Role | Date Applied | Status | Notes | Job Link
 * Setup: see README.md, section "1. Create the backend".
 */

// 1) Change this if your tab is not named Sheet1.
const SHEET_NAME = "Sheet1";

// 2) Change this to any private word/phrase. Put the SAME value in .env.local
//    as VITE_API_TOKEN. It stops strangers who find the URL from using it.
const TOKEN = "change-this-to-your-own-secret";

function getSheet_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Tab "' + SHEET_NAME + '" not found. Check SHEET_NAME in Code.gs.');
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function asText_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return value === null || value === undefined ? "" : String(value);
}

function toRow_(job) {
  return [
    job.company || "",
    job.role || "",
    job.dateApplied || "",
    job.status || "Applied",
    job.notes || "",
    job.link || "",
  ];
}

// GET ?token=...  -> list all applications
function doGet(e) {
  try {
    if (!e.parameter || e.parameter.token !== TOKEN) return json_({ error: "Unauthorized" });

    const values = getSheet_().getDataRange().getValues();
    const jobs = [];
    for (let i = 1; i < values.length; i++) {
      const r = values[i];
      if (!r[0] && !r[1]) continue; // skip blank rows
      jobs.push({
        rowIndex: i + 1, // real sheet row number
        company: asText_(r[0]),
        role: asText_(r[1]),
        dateApplied: asText_(r[2]),
        status: asText_(r[3]) || "Applied",
        notes: asText_(r[4]),
        link: asText_(r[5]),
      });
    }
    return json_(jobs);
  } catch (err) {
    return json_({ error: err.message });
  }
}

// POST {action: add | update | delete, token, ...}
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const body = JSON.parse(e.postData.contents);
    if (body.token !== TOKEN) return json_({ error: "Unauthorized" });

    const sheet = getSheet_();

    if (body.action === "add") {
      if (!body.job || !body.job.company || !body.job.role) {
        return json_({ error: "Company and role are required." });
      }
      sheet.appendRow(toRow_(body.job));
      return json_({ ok: true });
    }

    const row = Number(body.rowIndex);
    if (!Number.isInteger(row) || row < 2 || row > sheet.getLastRow()) {
      return json_({ error: "Invalid row." });
    }

    if (body.action === "update") {
      sheet.getRange(row, 1, 1, 6).setValues([toRow_(body.job)]);
      return json_({ ok: true });
    }

    if (body.action === "delete") {
      sheet.deleteRow(row);
      return json_({ ok: true });
    }

    return json_({ error: "Unknown action." });
  } catch (err) {
    return json_({ error: err.message });
  } finally {
    lock.releaseLock();
  }
}
