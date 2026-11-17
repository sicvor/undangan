(function () {
  const D = window.UNDANGAN;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const buat = (tag, kelas, teks) => {
    const el = document.createElement(tag);
    if (kelas) el.className = kelas;
    if (teks != null) el.textContent = teks;
    return el;
  };
  const ambil = (jalur) => jalur.split(".").reduce((o, k) => (o == null ? o : o[k]), D);

  /* ---------- Teks dasar ---------- */
  document.title = D.judul;
  const nilai = {
    inisial1: D.inisial[0], inisial2: D.inisial[1],
    panggilan1: D.mempelai[0].panggilan, panggilan2: D.mempelai[1].panggilan,
  };
  $$("[data-isi]").forEach((el) => {
    const k = el.dataset.isi;
    const v = k in nilai ? nilai[k] : ambil(k);
    if (v) el.textContent = v;
  });

  /* ---------- Nama tamu dari link: ?to=Nama+Tamu ---------- */
  const tamu = new URLSearchParams(location.search).get("to");
  if (tamu) {
    const bersih = tamu.trim().slice(0, 60);
    $("#namaTamu").textContent = bersih;
    $("#rsvpNama").value = bersih;
  }

  /* ---------- Mempelai ---------- */
  const wadahM = $("#daftarMempelai");
  D.mempelai.forEach((m, i) => {
    if (i === 1) wadahM.append(buat("p", "dan-besar ungkap", "&"));
    const kartu = buat("div", "mempelai ungkap");
    const bingkai = buat("div", "bingkai-lengkung");
    bingkai.dataset.hias = "lengkung";
    const isi = buat("div", "isi-lengkung");
    if (m.foto) {
      const img = buat("img");
      img.src = m.foto; img.alt = m.nama; img.loading = "lazy";
      isi.append(img);
    } else {
      isi.append(buat("span", "inisial-besar", m.panggilan.charAt(0)));
    }
    bingkai.append(isi);
    kartu.append(bingkai, buat("h3", "nama-skrip", m.panggilan));
    if (m.nama && m.nama !== m.panggilan) kartu.append(buat("p", "nama-lengkap", m.nama));
    const ortu = [m.ayah, m.ibu].filter(Boolean).join(" & ");
    if (ortu) {
      if (m.keterangan) kartu.append(buat("p", "label-kecil", m.keterangan));
      kartu.append(buat("p", null, ortu));
    }
    if (m.instagram) {
      const a = buat("a", "tombol garis kecil", "@" + m.instagram);
      a.href = "https://instagram.com/" + encodeURIComponent(m.instagram);
      a.target = "_blank"; a.rel = "noopener";
      kartu.append(a);
    }
    wadahM.append(kartu);
  });
  window.pasangHiasan(); // bunga & bingkai untuk semua elemen ber-data-hias

  /* ---------- Acara ---------- */
  const fmtGcal = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const wadahA = $("#daftarAcara");
  D.acara.forEach((a) => {
    const k = buat("div", "kartu acara ungkap");
    k.append(buat("h3", "judul-acara", a.nama));
    k.append(buat("p", "tanggal-acara", a.tanggal));
    k.append(buat("p", "jam-acara", a.jam));
    k.append(buat("div", "garis-emas"));
    k.append(buat("p", "tempat", a.tempat));
    k.append(buat("p", "alamat", a.alamat));
    const tombol = buat("div", "baris-tombol");
    if (a.peta) {
      const p = buat("a", "tombol utama kecil", "Lihat Lokasi");
      p.href = a.peta; p.target = "_blank"; p.rel = "noopener";
      tombol.append(p);
    }
    if (a.mulai) {
      const c = buat("a", "tombol garis kecil", "Simpan ke Kalender");
      const q = new URLSearchParams({
        action: "TEMPLATE",
        text: `${a.nama} ${D.mempelai[0].panggilan} & ${D.mempelai[1].panggilan}`,
        dates: `${fmtGcal(a.mulai)}/${fmtGcal(a.selesai || a.mulai)}`,
        location: `${a.tempat}, ${a.alamat}`,
      });
      c.href = "https://calendar.google.com/calendar/render?" + q;
      c.target = "_blank"; c.rel = "noopener";
      tombol.append(c);
    }
    k.append(tombol);
    wadahA.append(k);
  });

  /* ---------- Bagian opsional ---------- */
  const sembunyi = (id) => { $("#" + id).hidden = true; const n = $(`[data-nav="${id}"]`); if (n) n.hidden = true; };
  if (!D.ayat) sembunyi("ayat");

  if (D.cerita && D.cerita.length) {
    D.cerita.forEach((c) => {
      const li = buat("li", "ungkap");
      li.append(buat("span", "waktu", c.waktu), buat("h3", null, c.judul), buat("p", null, c.isi));
      $("#daftarCerita").append(li);
    });
  } else sembunyi("cerita");

  if (D.galeri && D.galeri.length) {
    D.galeri.forEach((src, i) => {
      const img = buat("img", "ungkap");
      img.src = src; img.alt = `Foto ${i + 1}`; img.loading = "lazy";
      img.addEventListener("click", () => bukaFoto(src));
      $("#daftarGaleri").append(img);
    });
  } else sembunyi("galeri");

  function bukaFoto(src) {
    const lapis = buat("div", "lapis-foto");
    const img = buat("img"); img.src = src; img.alt = "";
    lapis.append(img);
    lapis.addEventListener("click", () => lapis.remove());
    document.body.append(lapis);
  }

  if (D.amplop && D.amplop.length) {
    D.amplop.forEach((b, i) => {
      const k = buat("div", "kartu rekening ungkap");
      k.append(buat("p", "bank", b.bank));
      const no = buat("p", "nomor", b.nomor); no.id = "rek" + i;
      k.append(no);
      if (b.atasNama) k.append(buat("p", null, "a.n. " + b.atasNama));
      const t = buat("button", "tombol garis kecil", "Salin nomor");
      t.dataset.salinDari = "rek" + i;
      k.append(t);
      $("#daftarAmplop").append(k);
    });
  }
  if (D.alamatKado) $("#alamatKado").textContent = D.alamatKado; else $("#kartuKado").hidden = true;
  if ((!D.amplop || !D.amplop.length) && !D.alamatKado) sembunyi("amplop");

  /* ---------- Salin ke clipboard ---------- */
  function notif(teks) {
    const n = $("#notif");
    n.textContent = teks; n.classList.add("tampil");
    clearTimeout(notif.t); notif.t = setTimeout(() => n.classList.remove("tampil"), 2200);
  }
  document.addEventListener("click", async (e) => {
    const t = e.target.closest("[data-salin-dari]");
    if (!t) return;
    const teks = document.getElementById(t.dataset.salinDari).textContent.trim();
    try { await navigator.clipboard.writeText(teks); notif("Tersalin: " + teks); }
    catch { notif(teks); }
  });

  /* ---------- Hitung mundur ---------- */
  const target = new Date(D.tanggalUtama).getTime();
  const hm = Object.fromEntries($$("[data-hm]").map((el) => [el.dataset.hm, el]));
  function detak() {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    hm.hari.textContent = Math.floor(s / 86400);
    hm.jam.textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
    hm.menit.textContent = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    hm.detik.textContent = String(s % 60).padStart(2, "0");
  }
  detak(); setInterval(detak, 1000);

  /* ---------- Musik ---------- */
  const audio = $("#musik"), tMusik = $("#tombolMusik");
  if (D.musik) {
    audio.src = D.musik;
    tMusik.hidden = false;
    tMusik.addEventListener("click", () => (audio.paused ? audio.play() : audio.pause()));
    audio.addEventListener("play", () => tMusik.classList.add("putar"));
    audio.addEventListener("pause", () => tMusik.classList.remove("putar"));
  }

  /* ---------- Buka undangan ---------- */
  $("#buka").addEventListener("click", () => {
    document.body.classList.remove("terkunci");
    document.body.classList.add("terbuka");
    if (D.musik) audio.play().catch(() => {});
    window.scrollTo(0, 0);
  });

  /* ---------- Animasi muncul saat di-scroll ---------- */
  const io = new IntersectionObserver((ents) => {
    ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("terlihat"); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  $$(".ungkap").forEach((el) => io.observe(el));

  /* ---------- Navigasi aktif ---------- */
  const navLinks = $$("#navBawah a");
  const io2 = new IntersectionObserver((ents) => {
    ents.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("aktif", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main > section").forEach((s) => io2.observe(s));

  /* ---------- RSVP & ucapan ---------- */
  const form = $("#formRsvp"), pesan = $("#pesanRsvp");
  if (!D.rsvpGoogleScript && !D.rsvpWhatsApp) sembunyi("rsvp");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (D.rsvpGoogleScript) {
      $("#kirimRsvp").disabled = true;
      pesan.textContent = "Mengirim…";
      try {
        await fetch(D.rsvpGoogleScript, { method: "POST", body: new URLSearchParams(data) });
        pesan.textContent = "Terima kasih, konfirmasi Anda sudah kami terima.";
        form.reset();
        if (tamu) $("#rsvpNama").value = tamu;
        muatUcapan();
      } catch {
        pesan.textContent = "Gagal mengirim. Periksa koneksi lalu coba lagi.";
      }
      $("#kirimRsvp").disabled = false;
    } else {
      const teks = `Halo, saya ${data.nama}.\nKehadiran: ${data.hadir} (${data.jumlah} orang)\n\n${data.ucapan || ""}`;
      window.open(`https://wa.me/${D.rsvpWhatsApp}?text=${encodeURIComponent(teks)}`, "_blank");
    }
  });

  async function muatUcapan() {
    if (!D.rsvpGoogleScript) return;
    try {
      const r = await fetch(D.rsvpGoogleScript);
      const daftar = await r.json();
      const w = $("#daftarUcapan");
      w.replaceChildren();
      daftar.filter((u) => u.ucapan).slice(0, 100).forEach((u) => {
        const k = buat("div", "ucapan");
        const kepala = buat("p", "kepala-ucapan");
        kepala.append(buat("b", null, u.nama), buat("span", "lencana", u.hadir));
        k.append(kepala, buat("p", null, u.ucapan));
        w.append(k);
      });
    } catch { /* abaikan */ }
  }
  muatUcapan();
})();
