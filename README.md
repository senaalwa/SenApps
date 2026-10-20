# SenApps — GitHub Pages

Struktur situs:

- `/` — beranda dan profil pengembang SenApps (`index.html`)
- `/apps/` — katalog aplikasi (`apps/index.html`)
- `/privacy-policy/rupika/` — kebijakan privasi Rupika (`privacy-policy/rupika/index.html`)

## Sebelum dipublikasikan

1. Lengkapi email kontak pada `index.html`.
2. Lengkapi deskripsi dan fitur Rupika pada `apps/index.html`.
3. Ganti semua teks dalam tanda kurung siku (`[...]`) di `privacy-policy/rupika/index.html` dengan informasi yang benar tentang developer dan praktik data Rupika.
4. Pastikan kebijakan sesuai dengan perilaku aplikasi dan SDK yang digunakan, termasuk data yang dikumpulkan/dibagikan, retensi, keamanan, kontak, dan penghapusan akun/data.
5. Hapus kotak pengingat berwarna kuning dari halaman kebijakan setelah semua informasi dilengkapi.
6. Di GitHub, buka **Settings → Pages**, pilih **Deploy from a branch**, lalu pilih branch `main` dan folder `/ (root)`.

Jika repository bernama `SenApps`, URL kebijakan privasi Rupika akan menjadi `https://<username>.github.io/SenApps/privacy-policy/rupika/`.

## Menambah aplikasi

1. Buat folder `privacy-policy/nama-aplikasi/` dengan file `index.html` berisi kebijakan aplikasi itu.
2. Tambahkan kartu untuk aplikasi baru di `apps/index.html` dan tautkan ke `../privacy-policy/nama-aplikasi/`.
3. Pakai URL kebijakan yang sesuai untuk aplikasi tersebut di Play Console.
