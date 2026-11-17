# Undangan Pernikahan Digital

Halaman undangan web statis (HTML + CSS + JS, tanpa server), tema taman pink–emas.
Semua hiasan bunga, bingkai lengkung, dan pemandangan taman digambar dengan kode (SVG).

**Link:** https://sicvor.github.io/undangan/

## Mengirim ke tamu

Tambahkan nama tamu di belakang link:

```
https://sicvor.github.io/undangan/?to=Bapak+Budi+Santoso
```

Spasi ditulis `+`. Nama tampil di sampul ("Kepada Yth.") dan otomatis terisi di form RSVP.

## Mengubah isi undangan

Semua data ada di **`data.js`**: nama mempelai, orang tua, tanggal, acara, lokasi, ayat,
cerita, galeri, musik, rekening, dan penutup. Bagian yang dikosongkan otomatis disembunyikan.

- **Foto**: taruh di folder `foto/`, lalu isi `foto: "foto/raka.jpg"` atau daftar `galeri`.
  Kompres dulu (lebar ±1080 px, < 300 KB) supaya cepat dibuka.
- **Musik**: taruh file `.mp3` di `musik/`, lalu isi `musik: "musik/lagu.mp3"`.
  Musik mulai saat tamu menekan "Buka Undangan" (browser HP melarang musik otomatis).
- **Tampilan saat dibagikan di WhatsApp**: ubah `og:title` dan `og:description` di `index.html`.
  Gambarnya `aset/og.jpg`.

## Menyalakan GitHub Pages (sekali saja)

Settings → Pages → Build and deployment → Source: **Deploy from a branch** →
Branch: **main** / **(root)** → Save. Tunggu 1–2 menit, link di atas aktif.

## RSVP ke Google Sheets (opsional)

Tanpa ini, tombol "Kirim" di RSVP membuka WhatsApp ke nomor `rsvpWhatsApp`.
Agar konfirmasi tersimpan di spreadsheet dan ucapan tampil di halaman:

1. Buat Google Sheets baru → menu **Ekstensi → Apps Script**.
2. Hapus isi editor, tempel isi file `rsvp-google-sheets.gs`, lalu simpan.
3. **Terapkan → Deployment baru** → jenis **Aplikasi web**.
   Jalankan sebagai: **Saya**. Yang memiliki akses: **Siapa saja**. → Terapkan, izinkan aksesnya.
4. Salin URL Web App (berakhiran `/exec`) ke `rsvpGoogleScript` di `data.js`.

## Mencoba di komputer

```
python3 -m http.server 8000
```

lalu buka http://localhost:8000/?to=Tamu

## Opening interaktif (tahap uji)

Halaman: `opening.html` → https://sicvor.github.io/undangan/opening.html

- **Ganti nama & inisial**: bagian paling atas `assets/opening/config.js`.
- **Posisi, ukuran, urutan layer** dan **timing animasi**: juga di `assets/opening/config.js`.
- **Mode review**: tambahkan `?review` di belakang link → panel untuk lompat ke
  *Amplop* / *Villa* / *Akhir* (atau tombol 1/2/3), putar ulang, gerak lambat 0,25×, dan geser timeline.
  Bisa juga langsung `?state=tertutup`, `?state=villa`, `?state=akhir`.
- Aset asli ada di `assets/intro/`; halaman memakai versi WebP yang dikecilkan di `assets/intro/web/`
  (±3,4 MB total, dari 28 MB). Kalau mengganti PNG asli, buat ulang WebP-nya.
