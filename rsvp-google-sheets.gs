/**
 * Penyimpan RSVP & ucapan ke Google Sheets.
 * Cara pakai ada di README.md bagian "RSVP ke Google Sheets".
 */
const NAMA_SHEET = "RSVP";

function ambilSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(NAMA_SHEET);
  if (!sh) {
    sh = ss.insertSheet(NAMA_SHEET);
    sh.appendRow(["Waktu", "Nama", "Kehadiran", "Jumlah", "Ucapan"]);
  }
  return sh;
}

// Menerima kiriman form dari halaman undangan
function doPost(e) {
  const p = e.parameter;
  const potong = (v, n) => String(v || "").slice(0, n);
  ambilSheet_().appendRow([
    new Date(),
    potong(p.nama, 60),
    potong(p.hadir, 20),
    potong(p.jumlah, 2),
    potong(p.ucapan, 500),
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Mengirim daftar ucapan (terbaru dulu) untuk ditampilkan di halaman
function doGet() {
  const baris = ambilSheet_().getDataRange().getValues().slice(1).reverse();
  const data = baris.map((r) => ({ nama: r[1], hadir: r[2], ucapan: r[4] }));
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
