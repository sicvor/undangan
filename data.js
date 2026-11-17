/* =====================================================================
   DATA UNDANGAN — cukup ubah file ini saja.
   Semua teks di halaman diambil dari sini. Kosongkan ("") atau hapus
   bagian yang tidak dipakai, maka bagian itu otomatis disembunyikan.
   ===================================================================== */
window.UNDANGAN = {
  // Judul tab browser
  judul: "Undangan Pernikahan Raynold & Pasangan",
  deskripsi: "Kamis, 12 Desember 2030 · SKA Mall, Pekanbaru",

  // Inisial untuk monogram di cover (1 huruf masing-masing)
  inisial: ["R", "P"],

  // Urutan tampil: mempelai pertama dulu.
  // Kosongkan ayah/ibu kalau tidak ingin dicantumkan.
  mempelai: [
    {
      panggilan: "Raynold",
      nama: "Raynold",
      keterangan: "Putra dari",
      ayah: "",
      ibu: "",
      instagram: "", // tanpa @
      foto: "", // mis. "foto/raynold.jpg" — kosong = pakai inisial
    },
    {
      panggilan: "Pasangan", // GANTI dengan nama pasangan
      nama: "Pasangan",
      keterangan: "Putri dari",
      ayah: "",
      ibu: "",
      instagram: "",
      foto: "",
    },
  ],

  // Tanggal utama untuk hitung mundur (WIB = +07:00)
  tanggalUtama: "2030-12-12T08:00:00+07:00",
  tanggalTeks: "Kamis, 12 Desember 2030",

  acara: [
    {
      nama: "Hari Pernikahan",
      tanggal: "Kamis, 12 Desember 2030",
      jam: "08.00 WIB – selesai",
      mulai: "2030-12-12T08:00:00+07:00",
      selesai: "2030-12-12T13:00:00+07:00", // hanya untuk tombol "Simpan ke Kalender"
      tempat: "SKA Mall",
      alamat: "Pekanbaru, Riau",
      peta: "https://maps.app.goo.gl/jueXnyA6YDZLeogZ7",
    },
  ],

  // Ayat pembuka. Ganti dengan null kalau tidak dipakai.
  ayat: {
    arab: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    arti: "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    sumber: "QS. Ar-Rum: 21",
  },

  // Cerita cinta, mis. { judul: "Pertama Bertemu", waktu: "2024", isi: "..." }
  cerita: [],

  // Foto galeri (taruh file di folder foto/). Kosong = bagian galeri disembunyikan.
  galeri: [],

  // Musik latar — mulai diputar saat tamu menekan "Buka Undangan"
  musik: "musik/lagu.mp3",

  // RSVP: isi salah satu. Kalau keduanya kosong, bagian RSVP disembunyikan.
  // - rsvpGoogleScript: URL Web App Google Apps Script (lihat README)
  // - rsvpWhatsApp: nomor WA format 62xxxxxxxxxx (tanpa + dan tanpa 0 di depan)
  rsvpGoogleScript: "",
  rsvpWhatsApp: "",

  // Amplop digital
  amplop: [
    { bank: "BNI", nomor: "1919613928", atasNama: "" },
  ],
  alamatKado: "",

  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
};
