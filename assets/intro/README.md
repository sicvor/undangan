# Aset opening undangan

Gunakan folder `assets/intro/` di proyek Claude Code. File PNG dengan warna penuh adalah `paper-sage.png`, `landscape.png`, dan `landscape-villa.png`. Ketiga belas PNG lainnya punya kanal transparansi.

| Elemen | File | Gerakan |
|---|---|---|
| Amplop | `paper-sage.png`, `wax-seal.png` | Pakai satu tekstur untuk dua potongan CSS. Flap berputar ke atas bersama segel, kantong depan turun. |
| Jarak jauh | `landscape.png` | Latar penuh, bergerak sedikit selama reveal. |
| Jarak tengah | `villa.png`, `meadow.png` | Villa di tengah bawah, rumput menutupi kaki bangunan. Beri perubahan skala kecil saat kamera seolah maju. |
| Pohon pembuka atas | `tree-left.png`, `tree-right.png` | Keluar ke sudut atas masing-masing. |
| Pohon pembuka bawah | `tree-lower-left.png`, `tree-lower-right.png` | Keluar ke sudut bawah dengan pergerakan lebih jauh dan blur halus bila perlu. |
| Dekorasi atas | `hanging-left.png`, `hanging-right.png`, `ornament-top.png` | Daun turun berurutan, motif memudar masuk di tengah atas. |
| Rangkaian bunga | `flowers-bottom.png`, `flowers-left.png`, `flowers-right.png` | Bunga bawah naik lebih dulu, kemudian sisi kiri dan kanan. |
| Latar gabungan | `landscape-villa.png` | Pakai sebagai alternatif untuk preview sederhana yang memakai satu latar. |

Titik awal timeline setelah segel diklik:

- 0–0,8 dtk · Segel membesar sesaat. Flap membuka dan kantong amplop turun.
- 0,8–2,8 dtk · Empat pohon menyibak ke sudut sampai villa terlihat.
- 2,8–4,4 dtk · Tahan tampilan villa dan rumput.
- 4,4–5,8 dtk · Masukkan daun gantung, motif atas, dan rangkaian bunga secara bertahap.
- 5,8–7,4 dtk · Munculkan judul kecil dan nama sebagai teks HTML. Buat gradasi kabut halus dengan CSS bila diperlukan.
- Sesudah 7,4 dtk · Pertahankan komposisi akhir dan tampilkan petunjuk scroll.

Terapkan path relatif untuk GitHub Pages. Gunakan posisi dan skala setiap PNG yang bisa disesuaikan setelah preview di HP. Bagian tengah segel sengaja kosong agar inisial bisa ditambahkan sebagai teks saat coding.
