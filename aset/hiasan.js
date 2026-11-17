/* Hiasan SVG buatan sendiri: bunga, buket sudut, bingkai lengkung, taman cover, pembatas.
   Semua digambar dengan kode, jadi tidak perlu file gambar. */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const W = {
    krem: "#fbf4ec", blush: "#f2c9d3", mawar: "#d9668e", mawarTua: "#a83f68",
    persik: "#f3b9a0", lilac: "#d7c3e6", emas: "#b8935a", emasMuda: "#e2c48f",
    sage: "#8fa98f", sageTua: "#5f7d66", sageMuda: "#bfd1b9",
  };
  let urut = 0;

  // Acak dengan benih tetap supaya hiasan selalu sama setiap dibuka
  function acak(benih) {
    let s = benih >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }

  function gradien(id, terang, gelap) {
    return `<linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${gelap}"/><stop offset="1" stop-color="${terang}"/></linearGradient>`;
  }

  const kelopak = (p, l) =>
    `M0,0 C${l * 0.5},${-p * 0.25} ${l * 0.45},${-p} 0,${-p} C${-l * 0.45},${-p} ${-l * 0.5},${-p * 0.25} 0,0Z`;
  const daun = (p, l) =>
    `M0,0 C${l},${-p * 0.3} ${l * 0.6},${-p * 0.8} 0,${-p} C${-l * 0.6},${-p * 0.8} ${-l},${-p * 0.3} 0,0Z`;

  // Satu bunga mawar/peoni bergaya cat air
  function bunga(x, y, r, warna, rot, id) {
    const lapis = [
      { n: 7, p: r, l: r * 0.95, a: 0.92, f: `url(#${id}-l)` },
      { n: 6, p: r * 0.72, l: r * 0.8, a: 0.95, f: `url(#${id}-m)` },
      { n: 5, p: r * 0.45, l: r * 0.6, a: 1, f: `url(#${id}-d)` },
    ];
    let s = `<g transform="translate(${x},${y}) rotate(${rot})">`;
    lapis.forEach((L, i) => {
      for (let k = 0; k < L.n; k++) {
        const sudut = (360 / L.n) * k + i * 17;
        s += `<path d="${kelopak(L.p, L.l)}" fill="${L.f}" opacity="${L.a}" transform="rotate(${sudut})" stroke="${warna.garis}" stroke-width="${r * 0.02}" stroke-opacity=".35"/>`;
      }
    });
    s += `<circle r="${r * 0.16}" fill="${warna.tengah}"/>`;
    s += `<path d="M${-r * 0.08},0 a${r * 0.08},${r * 0.08} 0 1 1 ${r * 0.12},${r * 0.03}" fill="none" stroke="${warna.garis}" stroke-width="${r * 0.03}" stroke-opacity=".6"/>`;
    return s + "</g>";
  }

  function defsBunga(id, w) {
    return gradien(`${id}-l`, "#fff6f6", w.muda) + gradien(`${id}-m`, w.muda, w.utama) + gradien(`${id}-d`, w.utama, w.tua);
  }

  const PALET = [
    { muda: W.blush, utama: W.mawar, tua: W.mawarTua, tengah: "#f6d9a8", garis: W.mawarTua },
    { muda: "#fde3d6", utama: W.persik, tua: "#d98a6c", tengah: "#f7e2b5", garis: "#b8694e" },
    { muda: "#fbf3ee", utama: "#f0dccf", tua: "#d9b9a6", tengah: W.emasMuda, garis: "#b39283" },
    { muda: "#efe4f6", utama: W.lilac, tua: "#a98bc4", tengah: "#f5e6b8", garis: "#8a6aa8" },
  ];

  function daunSvg(x, y, panjang, rot, warna) {
    return `<g transform="translate(${x},${y}) rotate(${rot})">
      <path d="${daun(panjang, panjang * 0.32)}" fill="${warna}" opacity=".9"/>
      <path d="M0,0 L0,${-panjang * 0.92}" stroke="#fff" stroke-opacity=".45" stroke-width="1"/></g>`;
  }

  function buatSvg(viewBox, isi, kelas) {
    const el = document.createElementNS(NS, "svg");
    el.setAttribute("viewBox", viewBox);
    el.setAttribute("aria-hidden", "true");
    if (kelas) el.setAttribute("class", kelas);
    el.innerHTML = isi;
    return el;
  }

  // Buket di sudut kiri-bawah (sudut lain dicerminkan lewat CSS)
  function buket(benih) {
    const r = acak(benih);
    const id = "b" + urut++;
    let defs = PALET.map((w, i) => defsBunga(`${id}p${i}`, w)).join("");
    let s = "";
    // daun memancar dari sudut
    for (let i = 0; i < 11; i++) {
      const rot = -5 + i * 9 + r() * 6;
      s += daunSvg(10 + r() * 30, 230 - r() * 30, 70 + r() * 70, rot, [W.sage, W.sageTua, W.sageMuda][i % 3]);
    }
    // ranting kecil dengan kuncup
    for (let i = 0; i < 4; i++) {
      const ax = 60 + r() * 110, ay = 70 + r() * 90;
      s += `<path d="M30,220 Q${(ax + 30) / 2 + 20},${(ay + 220) / 2} ${ax},${ay}" stroke="${W.sageTua}" stroke-width="1.4" fill="none" opacity=".7"/>`;
      s += `<circle cx="${ax}" cy="${ay}" r="${4 + r() * 3}" fill="${[W.mawar, W.persik, W.lilac][i % 3]}" opacity=".85"/>`;
    }
    // bunga besar & sedang
    const tempat = [
      [70, 165, 46, 0], [140, 200, 36, 1], [30, 110, 32, 2], [115, 120, 24, 3], [175, 150, 18, 0], [60, 60, 16, 1],
    ];
    tempat.forEach(([x, y, rr, p]) => {
      s += bunga(x + r() * 8, y + r() * 8, rr, PALET[p], r() * 360, `${id}p${p}`);
    });
    // titik-titik kecil (baby's breath)
    for (let i = 0; i < 22; i++) {
      s += `<circle cx="${20 + r() * 200}" cy="${20 + r() * 200}" r="${1 + r() * 2}" fill="${i % 2 ? "#fff" : W.emasMuda}" opacity=".9"/>`;
    }
    return buatSvg("0 0 240 240", `<defs>${defs}</defs>${s}`);
  }

  // Bingkai lengkung emas dengan bunga di sudut
  function lengkung() {
    const id = "l" + urut++;
    let defs = PALET.map((w, i) => defsBunga(`${id}p${i}`, w)).join("");
    let s = `<path d="M14,286 V110 A86,86 0 0 1 186,110 V286 Z" fill="none" stroke="${W.emas}" stroke-width="2"/>
      <path d="M22,286 V112 A78,78 0 0 1 178,112 V286" fill="none" stroke="${W.emasMuda}" stroke-width="1"/>
      <circle cx="100" cy="18" r="4" fill="${W.emas}"/>
      <path d="M86,18 h-24 M114,18 h24" stroke="${W.emas}" stroke-width="1"/>`;
    for (let i = 0; i < 6; i++) s += daunSvg(18, 280, 40 + i * 6, -10 + i * 18, [W.sage, W.sageTua][i % 2]);
    for (let i = 0; i < 5; i++) s += daunSvg(184, 112, 30 + i * 5, 140 + i * 22, [W.sageMuda, W.sage][i % 2]);
    s += bunga(22, 270, 22, PALET[0], 20, `${id}p0`);
    s += bunga(50, 290, 14, PALET[1], 70, `${id}p1`);
    s += bunga(182, 110, 16, PALET[3], 10, `${id}p3`);
    s += bunga(170, 86, 10, PALET[2], 40, `${id}p2`);
    return buatSvg("-10 0 220 310", `<defs>${defs}</defs>${s}`);
  }

  // Pemandangan taman untuk cover
  function taman() {
    const id = "t" + urut++;
    const r = acak(7);
    let defs = `
      <linearGradient id="${id}-langit" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fbeff0"/><stop offset=".7" stop-color="#fdf6ee"/><stop offset="1" stop-color="#fbf4ec"/></linearGradient>
      <radialGradient id="${id}-matahari"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <linearGradient id="${id}-jalan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e6d6"/><stop offset="1" stop-color="#e9d6c0"/></linearGradient>
      <linearGradient id="${id}-air" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6f0ef"/><stop offset="1" stop-color="#c9dcda"/></linearGradient>`;
    let s = `<rect width="360" height="300" fill="url(#${id}-langit)"/>
      <circle cx="180" cy="95" r="90" fill="url(#${id}-matahari)"/>
      <path d="M0,150 L40,110 L80,128 L130,82 L170,118 L210,92 L260,124 L300,98 L360,132 V300 H0Z" fill="#ead9e6" opacity=".7"/>
      <path d="M0,168 L50,138 L100,154 L150,128 L200,150 L250,130 L310,152 L360,140 V300 H0Z" fill="#e3c9d8" opacity=".75"/>`;
    // pohon-pohon sakura
    const pohon = (x, y, sk) => {
      let t = `<path d="M${x},${y + 40 * sk} q-2,-20 0,-34" stroke="#9c7a6a" stroke-width="${3 * sk}" fill="none"/>`;
      for (let i = 0; i < 9; i++) {
        t += `<circle cx="${x + (r() - 0.5) * 46 * sk}" cy="${y + (r() - 0.5) * 26 * sk}" r="${(12 + r() * 9) * sk}" fill="${[W.blush, "#e9a9bf", "#f6dbe3", W.lilac][i % 4]}" opacity=".85"/>`;
      }
      return t;
    };
    s += pohon(40, 160, 1.1) + pohon(320, 158, 1.15) + pohon(95, 168, 0.8) + pohon(265, 168, 0.8);
    // pagar tanaman & jalan
    s += `<path d="M0,205 Q90,190 150,192 L210,192 Q270,190 360,205 V300 H0Z" fill="${W.sageMuda}"/>
      <path d="M150,192 L210,192 L290,300 L70,300Z" fill="url(#${id}-jalan)"/>
      <path d="M0,215 Q60,200 140,198 L140,212 Q60,214 0,232Z M360,215 Q300,200 220,198 L220,212 Q300,214 360,232Z" fill="${W.sage}"/>`;
    // gazebo lengkung emas
    s += `<g stroke="${W.emas}" fill="none" stroke-width="1.6">
        <path d="M148,192 V138 A32,32 0 0 1 212,138 V192"/>
        <path d="M156,192 V140 A24,24 0 0 1 204,140 V192" stroke-width="1"/>
        <circle cx="180" cy="102" r="3" fill="${W.emas}"/>
        <path d="M144,192 h72" stroke-width="2"/>
      </g>
      <path d="M156,140 A24,24 0 0 1 204,140 V192 H156Z" fill="#fff" opacity=".45"/>`;
    // air mancur
    s += `<ellipse cx="180" cy="262" rx="48" ry="11" fill="url(#${id}-air)" stroke="${W.emas}" stroke-width="1.2"/>
      <path d="M176,262 V238 h8 V262" fill="#f1e5d6" stroke="${W.emas}" stroke-width="1"/>
      <ellipse cx="180" cy="238" rx="20" ry="5" fill="url(#${id}-air)" stroke="${W.emas}" stroke-width="1"/>
      <path d="M180,232 q-10,-14 -18,2 M180,232 q10,-14 18,2 M180,234 V220" stroke="#b9d3d2" stroke-width="1.4" fill="none" class="air-mancur"/>`;
    // bunga kecil di pagar tanaman
    for (let i = 0; i < 40; i++) {
      const sisi = i % 2 ? r() * 140 : 220 + r() * 140;
      s += `<circle cx="${sisi}" cy="${206 + r() * 30}" r="${1.5 + r() * 2.5}" fill="${[W.mawar, "#fff", W.persik, W.lilac][i % 4]}" opacity=".9"/>`;
    }
    return buatSvg("0 0 360 300", `<defs>${defs}</defs>${s}`);
  }

  function pembatas() {
    const id = "p" + urut++;
    let s = `<path d="M10,30 H120 M200,30 H310" stroke="${W.emas}" stroke-width="1"/>
      <circle cx="10" cy="30" r="2" fill="${W.emas}"/><circle cx="310" cy="30" r="2" fill="${W.emas}"/>`;
    for (let i = 0; i < 4; i++) {
      s += daunSvg(160, 30, 26, -70 + i * 14, W.sage);
      s += daunSvg(160, 30, 26, 70 - i * 14 + 180 - 180, W.sageTua);
    }
    s += bunga(160, 30, 15, PALET[0], 0, `${id}p0`);
    return buatSvg("0 0 320 60", `<defs>${defsBunga(`${id}p0`, PALET[0])}</defs>${s}`);
  }

  window.pasangHiasan = function () {
    let benih = 3;
    document.querySelectorAll("[data-hias]").forEach((el) => {
      if (el.querySelector(":scope > svg")) return;
      const jenis = el.dataset.hias;
      const svg =
        jenis === "buket" ? buket(benih++ * 97) :
        jenis === "lengkung" ? lengkung() :
        jenis === "taman" ? taman() :
        jenis === "pembatas" ? pembatas() : null;
      if (svg) el.prepend(svg);
    });
  };
})();
