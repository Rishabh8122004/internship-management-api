// Today's date (server's local time) as "YYYY-MM-DD".
function getTodayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

// True only for real dates written as YYYY-MM-DD. "2026-02-31" is rejected.
function isRealDate(text) {
  if (typeof text !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return false;
  }
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) {
    return false;
  }
  // If the date "rolled over" (Feb 31 -> Mar 3), converting back gives a different text.
  return date.toISOString().slice(0, 10) === text;
}

module.exports = { getTodayString, isRealDate };