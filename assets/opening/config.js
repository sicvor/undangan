/* =====================================================================
   PENGATURAN OPENING — semua yang perlu disetel ada di file ini.
   ===================================================================== */
window.OPENING = {
  /* ---------- 1. NAMA (ganti di sini) ---------- */
  judulKecil: "The Wedding of",
  namaPertama: "[Nama Pertama]",
  namaKedua: "[Nama Kedua]",
  // Inisial di segel. Kosongkan ("") untuk memakai huruf pertama nama otomatis.
  inisialPertama: "",
  inisialKedua: "",
  ajakanSegel: "Ketuk segel untuk membuka undangan",
  petunjukScroll: "Gulir ke bawah",

  /* ---------- 2. POSISI LAYER ----------
     Satuan: x & w dalam % lebar layar, y dalam % tinggi layar.
     (ax, ay) = titik jangkar pada gambar: 0 = kiri/atas, 0.5 = tengah, 1 = kanan/bawah.
     Contoh villa: titik tengah-bawah gambar diletakkan di 50% lebar, 81% tinggi layar.
     z = urutan tumpukan (besar = di depan).
     Untuk empat pohon, posisi di sini = posisi AWAL (saat amplop tertutup);
     untuk layer lain = posisi AKHIR. Gerakannya diatur di bagian TIMELINE. */
  layer: {
    landscape:        { src: "landscape",        cover: true, z: 1 },
    villa:            { src: "villa",            x: 50,  y: 81,  w: 96,  ax: 0.5, ay: 1, z: 2 },
    meadow:           { src: "meadow",           x: 50,  y: 101, w: 205, ax: 0.5, ay: 1, z: 3 },
    flowersBottom:    { src: "flowers-bottom",   x: 50,  y: 101, w: 128, ax: 0.5, ay: 1, z: 6 },
    flowersLeft:      { src: "flowers-left",     x: -6,  y: 99,  w: 44,  ax: 0,   ay: 1, z: 7 },
    flowersRight:     { src: "flowers-right",    x: 106, y: 99,  w: 46,  ax: 1,   ay: 1, z: 7 },
    hangingLeft:      { src: "hanging-left",     x: -4,  y: -1,  w: 54,  ax: 0,   ay: 0, z: 7 },
    hangingRight:     { src: "hanging-right",    x: 104, y: -1,  w: 50,  ax: 1,   ay: 0, z: 7 },
    ornamentTop:      { src: "ornament-top",     x: 50,  y: 2.2, w: 68,  ax: 0.5, ay: 0, z: 6 },
    treeLeft:         { src: "tree-left",        x: -12, y: -4,  w: 118, ax: 0,   ay: 0, z: 10 },
    treeRight:        { src: "tree-right",       x: 110, y: -3,  w: 100,  ax: 1,   ay: 0, z: 10 },
    treeLowerLeft:    { src: "tree-lower-left",  x: -30, y: 106, w: 160, ax: 0,   ay: 1, z: 11 },
    treeLowerRight:   { src: "tree-lower-right", x: 130, y: 106, w: 160, ax: 1,   ay: 1, z: 11 },
  },

  // Area teks (y dalam % tinggi layar) — dijaga di atas atap villa
  teks: { atas: 19, bawah: 53 },
  // Segel: posisi pusat (y % tinggi) dan lebar (% lebar). Ujung flap mengikuti y ini.
  segel: { y: 55, w: 34 },

  /* ---------- 3. TIMELINE (detik, dihitung sejak segel diklik) ----------
     el    = nama elemen (layer di atas, atau: seal, flap, pocket, kabut, judul, nama1, dan, nama2, petunjuk)
     t     = mulai, dur = lama, ease = kurva gerak
     dari / ke = keadaan awal & akhir (CSS transform, opacity, filter).
     Satuan cqw/cqh = % lebar/tinggi layar. */
  timeline: [
    // 0–0,8 · amplop
    { el: "seal",   t: 0,    dur: 0.35, ease: "ease-out", frames: [{ transform: "scale(1)" }, { transform: "scale(1.14)", offset: 0.45 }, { transform: "scale(1.06)" }] },
    { el: "flap",   t: 0.12, dur: 0.68, ease: "cubic-bezier(.55,0,.35,1)", dari: { transform: "perspective(1400px) rotateX(0deg)" }, ke: { transform: "perspective(1400px) rotateX(178deg)" } },
    { el: "pocket", t: 0.3,  dur: 0.6,  ease: "cubic-bezier(.6,0,.9,.6)", dari: { transform: "translateY(0)" }, ke: { transform: "translateY(104%)" } },

    // 0,8–2,8 · pepohonan menyibak, kamera maju
    { el: "treeLeft",       t: 0.8, dur: 2.0, ease: "cubic-bezier(.55,.05,.3,1)", dari: { transform: "translate(0,0) rotate(0deg)" },                         ke: { transform: "translate(-105cqw,-62cqh) rotate(-12deg) scale(1.15)" } },
    { el: "treeRight",      t: 0.8, dur: 2.0, ease: "cubic-bezier(.55,.05,.3,1)", dari: { transform: "translate(0,0) rotate(0deg)" },                         ke: { transform: "translate(105cqw,-62cqh) rotate(12deg) scale(1.15)" } },
    { el: "treeLowerLeft",  t: 0.8, dur: 2.0, ease: "cubic-bezier(.5,0,.3,1)",   dari: { transform: "translate(0,0) scale(1)", filter: "blur(0px)" },   ke: { transform: "translate(-125cqw,55cqh) scale(1.35)", filter: "blur(5px)" } },
    { el: "treeLowerRight", t: 0.8, dur: 2.0, ease: "cubic-bezier(.5,0,.3,1)",   dari: { transform: "translate(0,0) scale(1)", filter: "blur(0px)" },   ke: { transform: "translate(125cqw,55cqh) scale(1.35)", filter: "blur(5px)" } },
    { el: "landscape",      t: 0.8, dur: 3.6, ease: "cubic-bezier(.3,0,.2,1)",   dari: { transform: "scale(1.0)" },  ke: { transform: "scale(1.035)" } },
    { el: "villa",          t: 0.8, dur: 3.0, ease: "cubic-bezier(.3,0,.2,1)",   dari: { transform: "scale(0.93)" }, ke: { transform: "scale(1)" } },
    { el: "meadow",         t: 0.8, dur: 3.0, ease: "cubic-bezier(.3,0,.2,1)",   dari: { transform: "scale(0.96)" }, ke: { transform: "scale(1.04)" } },

    // 4,4–5,8 · dekorasi masuk bertahap
    { el: "hangingLeft",   t: 4.4,  dur: 0.95, ease: "cubic-bezier(.2,.7,.3,1)", dari: { transform: "translateY(-105%)", opacity: 0 }, ke: { transform: "translateY(0)", opacity: 1 } },
    { el: "hangingRight",  t: 4.6,  dur: 0.95, ease: "cubic-bezier(.2,.7,.3,1)", dari: { transform: "translateY(-105%)", opacity: 0 }, ke: { transform: "translateY(0)", opacity: 1 } },
    { el: "ornamentTop",   t: 4.7,  dur: 0.8,  ease: "ease-out",                 dari: { transform: "translateY(-6px)", opacity: 0 },  ke: { transform: "translateY(0)", opacity: 1 } },
    { el: "kabut",         t: 4.5,  dur: 1.3,  ease: "ease-out",                 dari: { opacity: 0 }, ke: { opacity: 1 } },
    { el: "flowersBottom", t: 4.55, dur: 0.85, ease: "cubic-bezier(.2,.7,.3,1)", dari: { transform: "translateY(70%)", opacity: 0 },  ke: { transform: "translateY(0)", opacity: 1 } },
    { el: "flowersLeft",   t: 4.95, dur: 0.85, ease: "cubic-bezier(.2,.7,.3,1)", dari: { transform: "translate(-35%,20%)", opacity: 0 }, ke: { transform: "translate(0,0)", opacity: 1 } },
    { el: "flowersRight",  t: 5.05, dur: 0.75, ease: "cubic-bezier(.2,.7,.3,1)", dari: { transform: "translate(35%,20%)", opacity: 0 },  ke: { transform: "translate(0,0)", opacity: 1 } },

    // 5,8–7,4 · teks
    { el: "judul", t: 5.8,  dur: 0.7,  ease: "ease-out", dari: { opacity: 0, filter: "blur(6px)", transform: "translateY(6px)" },  ke: { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" } },
    { el: "nama1", t: 6.1,  dur: 0.8,  ease: "ease-out", dari: { opacity: 0, filter: "blur(10px)", transform: "translateY(8px)" }, ke: { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" } },
    { el: "dan",   t: 6.5,  dur: 0.55, ease: "ease-out", dari: { opacity: 0, filter: "blur(6px)", transform: "scale(.9)" },       ke: { opacity: 1, filter: "blur(0px)", transform: "scale(1)" } },
    { el: "nama2", t: 6.7,  dur: 0.7,  ease: "ease-out", dari: { opacity: 0, filter: "blur(10px)", transform: "translateY(8px)" }, ke: { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" } },

    // sesudah 7,4 · petunjuk scroll
    { el: "petunjuk", t: 7.6, dur: 0.6, ease: "ease-out", dari: { opacity: 0, transform: "translateY(8px)" }, ke: { opacity: 1, transform: "translateY(0)" } },
  ],

  // Waktu untuk tombol review "Villa terlihat" (detik)
  waktuVilla: 3.6,
};
