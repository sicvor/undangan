/* =====================================================================
   DATA UNDANGAN — cukup ubah file ini saja.
   Semua teks di halaman diambil dari sini. Kosongkan ("") atau hapus
   bagian yang tidak dipakai, maka bagian itu otomatis disembunyikan.
   ===================================================================== */
window.UNDANGAN = {
  // Judul tab browser & tampilan saat link dibagikan di WhatsApp
  judul: "Undangan Pernikahan Raka & Nadia",
  deskripsi: "Minggu, 17 Januari 2027 — Kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.",

  // Inisial untuk monogram di cover (1 huruf masing-masing)
  inisial: ["R", "N"],

  // Urutan tampil: mempelai pertama dulu
  mempelai: [
    {
      panggilan: "Raka",
      nama: "Raka Aditya Pratama, S.T.",
      keterangan: "Putra pertama dari",
      ayah: "Bapak Hendra Pratama",
      ibu: "Ibu Sri Wahyuni",
      instagram: "", // tanpa @, mis. "raka.aditya"
      foto: "", // mis. "foto/raka.jpg" — kosong = pakai inisial
    },
    {
      panggilan: "Nadia",
      nama: "Nadia Putri Salsabila, S.Pd.",
      keterangan: "Putri kedua dari",
      ayah: "Bapak Ahmad Fauzi",
      ibu: "Ibu Rina Marlina",
      instagram: "",
      foto: "",
    },
  ],

  // Tanggal utama untuk hitung mundur (format: TAHUN-BULAN-TANGGALTJAM:MENIT, WIB = +07:00)
  tanggalUtama: "2027-01-17T08:00:00+07:00",
  tanggalTeks: "Minggu, 17 Januari 2027",

  acara: [
    {
      nama: "Akad Nikah",
      tanggal: "Minggu, 17 Januari 2027",
      jam: "08.00 – 10.00 WIB",
      mulai: "2027-01-17T08:00:00+07:00",
      selesai: "2027-01-17T10:00:00+07:00",
      tempat: "Masjid Raya Al-Ikhlas",
      alamat: "Jl. Melati No. 12, Kel. Sukamaju, Kota Bandung",
      peta: "https://maps.google.com/?q=Masjid+Raya+Bandung",
    },
    {
      nama: "Resepsi",
      tanggal: "Minggu, 17 Januari 2027",
      jam: "11.00 – 14.00 WIB",
      mulai: "2027-01-17T11:00:00+07:00",
      selesai: "2027-01-17T14:00:00+07:00",
      tempat: "Gedung Serbaguna Taman Sari",
      alamat: "Jl. Taman Sari No. 45, Kota Bandung",
      peta: "https://maps.google.com/?q=Taman+Sari+Bandung",
    },
  ],

  // Ayat / kutipan pembuka. Hapus seluruh blok (ganti dengan null) kalau tidak dipakai.
  ayat: {
    arab: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    arti: "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    sumber: "QS. Ar-Rum: 21",
  },

  // Cerita cinta (boleh dikosongkan: cerita: [])
  cerita: [
    { judul: "Pertama Bertemu", waktu: "2021", isi: "Kami pertama kali bertemu di sebuah acara kampus, berawal dari obrolan singkat yang ternyata berlanjut panjang." },
    { judul: "Lamaran", waktu: "2026", isi: "Dengan restu kedua keluarga, kami melangsungkan lamaran dalam suasana hangat dan sederhana." },
    { judul: "Hari Bahagia", waktu: "2027", isi: "Kini kami siap melangkah bersama, memulai lembaran baru sebagai keluarga." },
  ],

  // Foto galeri (taruh file di folder foto/). Kosong = bagian galeri disembunyikan.
  galeri: [
    // "foto/galeri-1.jpg",
    // "foto/galeri-2.jpg",
  ],

  // Musik latar (taruh file di folder musik/). Kosong = tombol musik disembunyikan.
  musik: "",

  // RSVP:
  // - Isi "rsvpGoogleScript" dengan URL Web App Google Apps Script (lihat README) agar
  //   konfirmasi & ucapan tersimpan di Google Sheets dan tampil di halaman.
  // - Kalau kosong, tombol kirim akan membuka WhatsApp ke nomor "rsvpWhatsApp".
  rsvpGoogleScript: "",
  rsvpWhatsApp: "6281200000000", // format internasional tanpa + dan tanpa 0 di depan

  // Amplop digital (boleh dikosongkan: amplop: [])
  amplop: [
    { bank: "BCA", nomor: "1234567890", atasNama: "Raka Aditya Pratama" },
    { bank: "Mandiri", nomor: "0987654321", atasNama: "Nadia Putri Salsabila" },
  ],
  alamatKado: "Jl. Melati No. 12, Kel. Sukamaju, Kota Bandung (a.n. Nadia)",

  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
};
