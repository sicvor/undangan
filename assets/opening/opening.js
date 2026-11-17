(function () {
  "use strict";
  const C = window.OPENING;
  const $ = (s) => document.querySelector(s);
  const panggung = $("#opening");
  const adegan = $("#adegan");
  const segel = $("#segel");
  const ajakan = $("#ajakan");
  const kurangiGerak = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params = new URLSearchParams(location.search);
  const DIR = "assets/intro/web/";

  /* ---------- teks dari config ---------- */
  document.querySelectorAll("[data-isi]").forEach((el) => { el.textContent = C[el.dataset.isi] || ""; });
  const hurufAwal = (s) => (s.replace(/[^\p{L}]/gu, "").charAt(0) || "").toUpperCase();
  const i1 = C.inisialPertama || hurufAwal(C.namaPertama);
  const i2 = C.inisialKedua || hurufAwal(C.namaKedua);
  const ini = $("#inisial");
  ini.append(i1, Object.assign(document.createElement("small"), { textContent: "&" }), i2);
  document.title = `The Wedding of ${C.namaPertama} & ${C.namaKedua}`;

  /* ---------- posisi segel, teks ---------- */
  panggung.style.setProperty("--sy", C.segel.y + "cqh");
  panggung.style.setProperty("--sw", C.segel.w + "cqw");
  const teks = $("#teks");
  teks.style.top = C.teks.atas + "cqh";
  teks.style.height = C.teks.bawah - C.teks.atas + "cqh";

  /* ---------- layer gambar ---------- */
  const el = {};
  const G = C.goyang;
  const gambar = (src) => {
    const img = document.createElement("img");
    img.src = DIR + src + ".webp";
    img.alt = "";
    img.decoding = "async";
    img.draggable = false;
    return img;
  };
  const goyangan = []; // animasi diam (tak berujung): rumput, bunga, daun
  for (const [nama, L] of Object.entries(C.layer)) {
    // wadah menerima gerak timeline; gambar di dalamnya menerima goyangan halus
    const wadah = document.createElement("div");
    wadah.className = "layer" + (L.cover ? " cover" : "");
    wadah.style.zIndex = L.z;
    if (L.blur) wadah.style.filter = `blur(${L.blur}px)`;
    if (!L.cover) {
      wadah.style.left = L.x + "cqw";
      wadah.style.top = L.y + "cqh";
      wadah.style.width = L.w + "cqw";
      wadah.style.translate = `${-L.ax * 100}% ${-L.ay * 100}%`;
      wadah.style.transformOrigin = `${L.ax * 100}% ${L.ay * 100}%`;
    }
    if (L.goyang === "rumput" && G) {
      // rumput dipotong jadi beberapa pita vertikal bertepi lembut; tiap pita bergoyang
      // dengan fase berbeda sehingga terlihat seperti angin yang menyapu
      const n = G.rumput.pita, lebar = 100 / n, f = lebar * 0.45;
      for (let i = 0; i < n; i++) {
        const img = gambar(L.src);
        img.className = i ? "pita" : "pita pertama";
        const a = i * lebar, b = a + lebar;
        const kiri = i === 0 ? "#000 0%" : `transparent ${a - f}%, #000 ${a + f}%`;
        const kanan = i === n - 1 ? "#000 100%" : `#000 ${b - f}%, transparent ${b + f}%`;
        img.style.webkitMaskImage = img.style.maskImage = `linear-gradient(90deg, ${kiri}, ${kanan})`;
        wadah.append(img);
        goyangan.push(img.animate(
          [{ transform: `skewX(${-G.rumput.sudut}deg)` }, { transform: `skewX(${G.rumput.sudut}deg)` }],
          { duration: (G.rumput.periode + (i % 3) * 0.45) * 1000, delay: -i * G.rumput.jeda * 1000,
            direction: "alternate", iterations: Infinity, easing: "ease-in-out" }));
      }
    } else {
      const img = gambar(L.src);
      wadah.append(img);
      const g = L.goyang && G && G[L.goyang];
      if (g) {
        img.style.transformOrigin = L.goyang === "daun" ? `${L.ax * 100}% 0%` : `${L.ax * 100}% 100%`;
        goyangan.push(img.animate(
          [{ transform: `rotate(${-g.sudut}deg)` }, { transform: `rotate(${g.sudut}deg)` }],
          { duration: g.periode * 1000, delay: -Math.random() * g.periode * 1000,
            direction: "alternate", iterations: Infinity, easing: "ease-in-out" }));
      }
    }
    adegan.prepend(wadah);
    el[nama] = wadah;
  }
  if (kurangiGerak) goyangan.forEach((a) => a.cancel());
  document.querySelectorAll("[data-el]").forEach((n) => { el[n.dataset.el] = n; });

  /* ---------- nama: kecilkan otomatis kalau terlalu panjang ---------- */
  function pasNama() {
    const maks = teks.clientWidth;
    document.querySelectorAll(".nama .baris").forEach((b) => {
      b.style.removeProperty("--ukuran-nama");
      const lebar = b.scrollWidth;
      if (lebar > maks) b.style.setProperty("--ukuran-nama", `calc(15cqw * ${(maks / lebar).toFixed(3)})`);
    });
  }

  /* ---------- timeline (Web Animations API, bisa diputar & digeser) ---------- */
  const anim = C.timeline.map((e) => {
    const target = el[e.el];
    if (!target) { console.warn("Elemen timeline tidak ditemukan:", e.el); return null; }
    const frames = e.frames || [e.dari, e.ke];
    const a = target.animate(frames, { delay: e.t * 1000, duration: e.dur * 1000, easing: e.ease || "ease", fill: "both" });
    a.pause();
    a.currentTime = 0;
    return a;
  }).filter(Boolean);
  const totalMs = Math.max(...C.timeline.map((e) => (e.t + e.dur) * 1000));

  let mulaiPada = null, rafId = 0, putaran = 0;
  const petunjuk = el.petunjuk;
  const petunjukMulai = (C.timeline.find((e) => e.el === "petunjuk") || { t: 0 }).t * 1000;
  // amplop disembunyikan setelah animasi seal/flap/pocket selesai
  const amplopSelesai = Math.max(...C.timeline.filter((e) => ["seal", "flap", "pocket"].includes(e.el)).map((e) => (e.t + e.dur) * 1000));
  function aturKelas(ms) {
    document.body.classList.toggle("selesai-buka", ms >= amplopSelesai);
    const tampil = ms >= petunjukMulai;      // petunjuk baru bisa difokus setelah muncul
    petunjuk.tabIndex = tampil ? 0 : -1;
    petunjuk.setAttribute("aria-hidden", String(!tampil));
    document.body.classList.toggle("tertutup", ms < totalMs && !params.has("review"));
  }
  function geserKe(ms) {
    putaran++;
    cancelAnimationFrame(rafId);
    anim.forEach((a) => { a.pause(); a.currentTime = ms; });
    aturKelas(ms);
    tampilWaktu(ms);
  }
  function putar(kecepatan = 1, dari = 0) {
    const id = ++putaran;
    anim.forEach((a) => { a.pause(); a.currentTime = dari; a.playbackRate = kecepatan; a.play(); });
    document.body.classList.add("membuka");
    mulaiPada = performance.now() - dari / kecepatan;
    const loop = () => {
      if (id !== putaran) return;
      const ms = Math.min(totalMs, (performance.now() - mulaiPada) * kecepatan);
      aturKelas(ms);
      tampilWaktu(ms);
      if (ms < totalMs) rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
  }

  /* ---------- buka amplop ---------- */
  let sudahDibuka = false;
  function buka() {
    if (sudahDibuka || segel.disabled) return;   // cegah klik ganda
    sudahDibuka = true;
    segel.disabled = true;
    segel.setAttribute("aria-label", "Undangan dibuka");
    if (kurangiGerak) {
      geserKe(totalMs);
      adegan.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: "ease-out" });
    } else {
      putar(1);
    }
    $("#detail").setAttribute("tabindex", "-1");
  }
  segel.addEventListener("click", buka);

  /* ---------- preload: semua gambar + font sebelum segel aktif ---------- */
  const semuaGambar = [...document.images];
  const tungguGambar = semuaGambar.map((img) => img.decode().catch(() => {}));
  const tungguFont = document.fonts
    ? Promise.all([
        document.fonts.load("40px 'Pinyon Script'", C.namaPertama + C.namaKedua + "&"),
        document.fonts.load("600 20px 'Cormorant Garamond'", C.judulKecil),
      ]).catch(() => {})
    : Promise.resolve();
  const batasWaktu = new Promise((r) => setTimeout(r, 10000));
  Promise.race([Promise.all([...tungguGambar, tungguFont]), batasWaktu]).then(() => {
    pasNama();
    segel.disabled = false;
    segel.removeAttribute("aria-busy");
    ajakan.textContent = C.ajakanSegel;
    document.body.classList.add("siap");
    terapkanStateUrl();
  });
  addEventListener("resize", pasNama);
  // untuk alat review/rekam: geser timeline & akses animasi
  window.OPENING_DEBUG = { geserKe, anim, goyangan, totalMs };

  /* ---------- mode review: ?review atau ?state=tertutup|villa|akhir ---------- */
  const panel = $("#review"), geser = $("#geser"), waktu = $("#waktu");
  geser.max = (totalMs / 1000).toFixed(2);
  function tampilWaktu(ms) {
    if (panel.hidden) return;
    geser.value = (ms / 1000).toFixed(2);
    waktu.textContent = (ms / 1000).toFixed(2).replace(".", ",") + " dtk";
  }
  const STATE = { tertutup: 0, villa: C.waktuVilla * 1000, akhir: totalMs };
  function keState(nama) {
    if (!(nama in STATE)) return;
    sudahDibuka = nama !== "tertutup";
    segel.disabled = sudahDibuka;
    geserKe(STATE[nama]);
    panel.querySelectorAll("[data-state]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.state === nama)));
  }
  function terapkanStateUrl() {
    if (params.has("state")) keState(params.get("state"));
  }
  if (params.has("review") || params.has("state")) {
    panel.hidden = false;
    panel.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.state) keState(b.dataset.state);
      if (b.dataset.aksi) {
        panel.querySelectorAll("[data-state]").forEach((x) => x.setAttribute("aria-pressed", "false"));
        sudahDibuka = true; segel.disabled = true;
        putar(b.dataset.aksi === "lambat" ? 0.25 : 1);
      }
    });
    geser.addEventListener("input", () => {
      panel.querySelectorAll("[data-state]").forEach((x) => x.setAttribute("aria-pressed", "false"));
      sudahDibuka = +geser.value > 0; segel.disabled = sudahDibuka;
      geserKe(geser.value * 1000);
    });
    addEventListener("keydown", (e) => {
      if (e.target.matches("input, button")) return;
      const k = { 1: "tertutup", 2: "villa", 3: "akhir" }[e.key];
      if (k) keState(k);
    });
  }
})();
