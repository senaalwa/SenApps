# SenApps

Situs statis SenApps, katalog aplikasi dan kebijakan privasi di GitHub Pages:
https://senaalwa.github.io/SenApps/

## Struktur

```text
index.html                         Beranda
apps/index.html                    Katalog dinamis
apps/<slug>/index.html             Halaman detail aplikasi
data/apps.json                     Sumber data katalog
assets/styles.css                  Style bersama dan komponen katalog/detail
assets/scripts/catalog.js          Renderer katalog, pencarian, filter
assets/scripts/app-detail.js       Renderer halaman detail bersama
assets/senapps-logo.svg            Logo SenApps
assets/images/apps/<slug>/         Ikon dan screenshot aplikasi
privacy-policy/<slug>/index.html   Kebijakan privasi aplikasi
```

Path aplikasi dalam apps.json ditulis relatif terhadap root repository tanpa slash di awal. Renderer menyelesaikan path terhadap base URL situs, sehingga tetap benar di bawah /SenApps/ dan dari halaman bersarang.

## Pratinjau lokal

Jalankan server statis dari root repository:

```sh
python -m http.server 8000
```

Buka http://localhost:8000/. Jangan membuka katalog melalui file:// karena browser membatasi pemuatan JSON.

## Menambahkan aplikasi

1. Pilih slug unik huruf kecil, misalnya aplikasi-baru.
2. Simpan ikon asli di assets/images/apps/aplikasi-baru/icon.png. Simpan screenshot asli di assets/images/apps/aplikasi-baru/screenshots/. Jika aset belum tersedia, biarkan icon null dan screenshots kosong.
3. Tambahkan satu objek ke array apps pada data/apps.json. Kartu katalog dibuat otomatis; HTML katalog tidak perlu diedit.
4. Salin apps/rupika/index.html ke apps/aplikasi-baru/index.html lalu ubah data-app-id ke ID baru. Halaman memakai renderer detail bersama.
5. Buat halaman kebijakan privasi sendiri di privacy-policy/aplikasi-baru/index.html. Tulis berdasarkan praktik aplikasi yang sudah diverifikasi.
6. Isi URL Google Play hanya jika listing publik sudah tersedia. Tanpa URL, tombol Google Play tidak ditampilkan.
7. Validasi JSON dan periksa halaman detail, privasi, ikon, serta screenshot di pratinjau.

## Field apps.json

| Field | Keterangan |
| --- | --- |
| id | ID unik dan stabil; samakan dengan data-app-id di halaman detail. |
| name | Nama publik aplikasi. |
| category | Kategori, dipakai untuk filter. |
| shortDescription | Ringkasan pada kartu dan detail. |
| description | Deskripsi lengkap yang terverifikasi. |
| icon | Path ikon relatif root atau null. |
| screenshots | Array path screenshot asli, atau array kosong. |
| features | Array fitur terverifikasi, atau array kosong. |
| status | in-development, testing, released, maintenance, atau null jika belum diketahui. |
| platforms | Array platform terverifikasi, atau array kosong jika belum diketahui. |
| playStoreUrl | URL listing Google Play publik atau null. |
| detailPage | Path detail relatif root, misalnya apps/aplikasi-baru/. |
| privacyPolicy | Path kebijakan privasi relatif root. |
| supportEmail | Email dukungan aplikasi. |
| featured | Boolean untuk urutan unggulan. |

Field opsional yang kosong ditangani tanpa merusak halaman. Katalog menyediakan pencarian dan filter kategori. Jika data JSON gagal dimuat, halaman menampilkan pesan kesalahan yang jelas.

## Publikasi

Push perubahan ke branch main. GitHub Pages harus tetap memakai branch main dan folder root melalui Settings → Pages.
