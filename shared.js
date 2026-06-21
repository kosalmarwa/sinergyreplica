/* ============================================================
   SINERGY REPLICA — shared.js
   Digunakan oleh semua halaman HTML (index, permohonan, dst.)
   ============================================================ */

/* ----------------------------------------------------------
   FIREBASE CONFIG
   ---------------------------------------------------------- */
const FB_STORAGE_KEY  = 'sinergy_replica_fb_url';
const FB_URL_DEFAULT  = 'https://sinergyreplica-default-rtdb.asia-southeast1.firebasedatabase.app';
let   FB_URL          = localStorage.getItem(FB_STORAGE_KEY) || FB_URL_DEFAULT;

/* ----------------------------------------------------------
   GENERIC FIREBASE REST HELPERS
   ---------------------------------------------------------- */
async function fbGet(path) {
  const res = await fetch(`${FB_URL}${path}.json`);
  if (!res.ok) throw new Error('Firebase GET gagal: ' + res.status);
  return res.json();
}

async function fbPost(path, data) {
  const res = await fetch(`${FB_URL}${path}.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Firebase POST gagal: ' + res.status);
  const json = await res.json();
  return json.name; // push key
}

async function fbPatch(path, data) {
  const res = await fetch(`${FB_URL}${path}.json`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Firebase PATCH gagal: ' + res.status);
  return res.json();
}

async function fbPut(path, data) {
  const res = await fetch(`${FB_URL}${path}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Firebase PUT gagal: ' + res.status);
  return res.json();
}

async function fbDelete(path) {
  const res = await fetch(`${FB_URL}${path}.json`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Firebase DELETE gagal: ' + res.status);
  return res.json();
}

/* ----------------------------------------------------------
   SK PPKH FIREBASE HELPERS
   ---------------------------------------------------------- */
async function fbSaveSkPpkh(skData) {
  return fbPost('/sk_ppkh', skData);
}

async function fbLoadSkPpkh() {
  const json = await fbGet('/sk_ppkh');
  if (!json) return [];
  return Object.entries(json).map(([key, val]) => ({ _fbKey: key, ...val }));
}

async function fbLoadOneSkPpkh(fbKey) {
  const json = await fbGet('/sk_ppkh/' + fbKey);
  if (!json) return null;
  return { _fbKey: fbKey, ...json };
}

async function fbUpdateSkPpkh(fbKey, skData) {
  return fbPatch('/sk_ppkh/' + fbKey, skData);
}

async function fbDeleteSkPpkh(fbKey) {
  return fbDelete('/sk_ppkh/' + fbKey);
}

/* ----------------------------------------------------------
   MAPPING: Firebase ↔ UI  (satu sumber kebenaran)
   ---------------------------------------------------------- */
function fbToUi(sk) {
  const luas_raw = parseFloat(sk.luas_ha || 0);
  return {
    _fbKey:            sk._fbKey,
    sumber_data:       sk.sumber_data || 'tanpa_permohonan',
    created_at:        sk.created_at  || '',
    updated_at:        sk.updated_at  || '',
    nama_lembaga:      sk.nama_lembaga      || '',
    jenis_badan_usaha: sk.jenis_badan_usaha || '',
    id_ippkh:          sk.id_ippkh          || '',
    nomor_sk:          sk.nomor_sk          || '',
    tanggal_terbit:    sk.tanggal_terbit    || '',
    tanggal_berlaku_efektif: sk.tanggal_berlaku_efektif || sk.tanggal_terbit || '',
    tanggal_berakhir:  sk.tanggal_berakhir  || '',
    tahun_sk:          sk.tahun_sk          || (sk.tanggal_terbit || '').substring(0,4),
    kategori_ppkh:     sk.kategori_ppkh     || '',
    tipe_ppkh:         sk.tipe_ppkh         || '',
    status_ppkh:       sk.status_ppkh       || '',
    keterangan_masa_berlaku: sk.keterangan_masa_berlaku || '',
    pulau:             sk.pulau             || '',
    provinsi:          sk.provinsi          || '',
    kabupaten:         sk.kabupaten         || '',
    lokasi_detail:     sk.lokasi_detail     || '',
    wilayah_bpkh:      sk.wilayah_bpkh      || '',
    kegunaan_kawasan:  sk.kegunaan_kawasan  || '',
    guna_kawasan:      sk.guna_kawasan      || '',
    sub_guna:          sk.sub_guna          || '',
    jenis_kegiatan:    sk.jenis_kegiatan    || '',
    jenis_permohonan:  sk.jenis_permohonan  || '',
    jenis_operasional: sk.jenis_operasional || '',
    luas_ha:           luas_raw,
    luas_hl:           parseFloat(sk.luas_hl  || 0),
    luas_hpt:          parseFloat(sk.luas_hpt || 0),
    luas_rencana:      parseFloat(sk.luas_rencana || 0),
    perlu_pak:         sk.perlu_pak         || '',
    tanggal_berakhir_komitmen: sk.tanggal_berakhir_komitmen || '',
    status_komitmen:   sk.status_komitmen   || sk.status_ppkh || '',
    status_tabel:      sk.status_tabel      || '',
    status_tabel_kewajiban: sk.status_tabel_kewajiban || '',
    kewajiban_pekerjaan: sk.kewajiban_pekerjaan || '',
    kewajiban_ppkh:    sk.kewajiban_ppkh    || '',
    daftar_kewajiban:  sk.daftar_kewajiban  || '',
    penerbit_sk:       sk.penerbit_sk       || '',
    nomor_permohonan:  sk.nomor_permohonan  || '',
    izin_sektoral:     sk.izin_sektoral     || '',
    kuota_ppkh:        sk.kuota_ppkh        || '',
    detail_lembaga:    sk.detail_lembaga    || '',
    tentang_sk_ppkh:   sk.tentang_sk_ppkh   || '',
    ppsdh_ippkh:       sk.ppsdh_ippkh       || '',
    id_pp:             sk.id_pp             || '',
    kph:               sk.kph               || '',
    pbph:              sk.pbph              || '',
    jumlah_halaman:    sk.jumlah_halaman    || '',
    status_tabel_sk:   sk.status_tabel_sk   || '',
    hasPdf:            false,
    hasPeta:           false,
    ippkh:             sk.id_ippkh          || '(belum ada)',
    nomor:             sk.nomor_sk          || '',
    tipe:              sk.tipe_ppkh         || '',
    tanggal:           sk.tanggal_terbit    || '',
    berakhir:          sk.tanggal_berakhir  || '',
    luas:              luas_raw.toLocaleString('id-ID'),
    status:            sk.status_ppkh       || '',
    kegunaan:          sk.kegunaan_kawasan  || '',
    guna:              sk.guna_kawasan      || '—',
    kabupaten_alias:   sk.kabupaten         || '—',
    kategori:          sk.kategori_ppkh     || '',
    masaBerlaku:       (sk.tanggal_terbit||'') + ' s/d ' + (sk.tanggal_berakhir||''),
    komitmen:          sk.tanggal_berakhir_komitmen || '—',
    statusKomitmen:    sk.status_komitmen   || sk.status_ppkh || '',
  };
}

function uiToFb(ui) {
  return {
    nama_lembaga:      ui.nama_lembaga,
    jenis_badan_usaha: ui.jenis_badan_usaha      || '',
    id_ippkh:          ui.id_ippkh               || '',
    nomor_sk:          ui.nomor_sk               || '',
    tanggal_terbit:    ui.tanggal_terbit          || '',
    tanggal_berlaku_efektif: ui.tanggal_berlaku_efektif || '',
    tanggal_berakhir:  ui.tanggal_berakhir        || '',
    tahun_sk:          ui.tahun_sk               || '',
    kategori_ppkh:     ui.kategori_ppkh          || '',
    tipe_ppkh:         ui.tipe_ppkh              || '',
    status_ppkh:       ui.status_ppkh            || '',
    keterangan_masa_berlaku: ui.keterangan_masa_berlaku || '',
    pulau:             ui.pulau                  || '',
    provinsi:          ui.provinsi               || '',
    kabupaten:         ui.kabupaten              || '',
    lokasi_detail:     ui.lokasi_detail          || '',
    wilayah_bpkh:      ui.wilayah_bpkh           || '',
    kegunaan_kawasan:  ui.kegunaan_kawasan        || '',
    guna_kawasan:      ui.guna_kawasan            || '',
    sub_guna:          ui.sub_guna               || '',
    jenis_kegiatan:    ui.jenis_kegiatan          || '',
    jenis_permohonan:  ui.jenis_permohonan        || '',
    jenis_operasional: ui.jenis_operasional       || '',
    luas_ha:           parseFloat(ui.luas_ha)     || 0,
    luas_hl:           parseFloat(ui.luas_hl)     || 0,
    luas_hpt:          parseFloat(ui.luas_hpt)    || 0,
    luas_rencana:      parseFloat(ui.luas_rencana)|| 0,
    perlu_pak:         ui.perlu_pak              || '',
    tanggal_berakhir_komitmen: ui.tanggal_berakhir_komitmen || '',
    status_komitmen:   ui.status_komitmen        || '',
    status_tabel:      ui.status_tabel           || '',
    status_tabel_kewajiban: ui.status_tabel_kewajiban || '',
    kewajiban_pekerjaan: ui.kewajiban_pekerjaan  || '',
    kewajiban_ppkh:    ui.kewajiban_ppkh         || '',
    daftar_kewajiban:  ui.daftar_kewajiban       || '',
    penerbit_sk:       ui.penerbit_sk            || '',
    nomor_permohonan:  ui.nomor_permohonan       || '',
    izin_sektoral:     ui.izin_sektoral          || '',
    kuota_ppkh:        ui.kuota_ppkh             || '',
    detail_lembaga:    ui.detail_lembaga         || '',
    tentang_sk_ppkh:   ui.tentang_sk_ppkh        || '',
    ppsdh_ippkh:       ui.ppsdh_ippkh            || '',
    id_pp:             ui.id_pp                  || '',
    kph:               ui.kph                    || '',
    pbph:              ui.pbph                   || '',
    jumlah_halaman:    ui.jumlah_halaman         || '',
    status_tabel_sk:   ui.status_tabel_sk        || '',
    sumber_data:       ui.sumber_data            || 'tanpa_permohonan',
    updated_at:        new Date().toISOString(),
  };
}

/* ----------------------------------------------------------
   KEWAJIBAN MASTER (17 kewajiban PPKH)
   ---------------------------------------------------------- */
const KEWAJIBAN_MASTER = [
  'Membayar PSDH, dan/atau DR',
  'Membayar PNBP Penggunaan Kawasan Hutan',
  'Membayar ganti rugi nilai tegakan kepada pemerintah apabila areal PPKH merupakan hutan tanaman hasil rehabilitasi',
  'Mengganti biaya investasi Pengelolaan Hutan/ Pemanfaatan Hutan kepada pengelola/pemegang PBPH',
  'Membuat rencana dan melaksanakan reklamasi dan revegetasi pada Kawasan Hutan yang sudah tidak dipergunakan',
  'Melakukan penanaman dalam rangka rehabilitasi Daerah Aliran Sungai (DAS)',
  'Melakukan penanaman tanaman kayu di bagian tepi di kiri kanan atau sekeliling areal PPKH',
  'Melaksanakan inventarisasi tegakan sesuai dengan rencana kerja PKH tahunan',
  'Pemeliharaan Batas Areal PPKH',
  'Melakukan pemberdayaan masyarakat sekitar areal PPKH',
  'Melaksanakan Perlindungan Hutan Atas Areal PPKH',
  'Melaksanakan pencegahan dan perlindungan terhadap kebakaran hutan dan lahan',
  'Memberikan kemudahan bagi aparat LHK pada kegiatan monitoring dan evaluasi di lapangan',
  'Mengamankan Kawasan Hutan dalam hal areal PPKH berbatasan dengan Hutan Konservasi dan Hutan Lindung',
  'Mengkoordinasikan kegiatan kepada instansi LHK setempat, pemegang izin Pemanfaatan Hutan, Pengelolaan Hutan',
  'Melaksanakan kewajiban lain yang ditetapkan oleh Menteri',
  'Melaksanakan perlindungan satwa liar dan/atau satwa yang dilindungi sesuai SOP'
];

/* ----------------------------------------------------------
   TOAST NOTIFICATION
   ---------------------------------------------------------- */
function showToast(msg) {
  let toast = document.getElementById('toastNotif');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotif';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#323232;color:white;padding:10px 20px;border-radius:4px;font-size:13px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:opacity 0.3s;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

/* ----------------------------------------------------------
   SESSION / ROLE (localStorage)
   ---------------------------------------------------------- */
const ROLE_LS_KEY    = 'sinergy_active_role';
const AKUISI_LS_KEY  = 'sinergy_akuisisi_ppkh';
const ACTIVE_SK_KEY  = 'sinergy_active_sk';

function getRole()                { return localStorage.getItem(ROLE_LS_KEY) || 'superadmin'; }
function setRole(role)            { localStorage.setItem(ROLE_LS_KEY, role); }

function getAkuisisi()            { return JSON.parse(localStorage.getItem(AKUISI_LS_KEY) || '[]'); }
function setAkuisisi(arr)         { localStorage.setItem(AKUISI_LS_KEY, JSON.stringify(arr)); }

/* ----------------------------------------------------------
   ACTIVE SK CONTEXT (cross-page sharing)
   Beranda → set sebelum navigasi ke halaman lain
   ---------------------------------------------------------- */
function getActiveSK()            { return localStorage.getItem(ACTIVE_SK_KEY) || null; }
function setActiveSK(fbKey)       { localStorage.setItem(ACTIVE_SK_KEY, fbKey); }
function clearActiveSK()          { localStorage.removeItem(ACTIVE_SK_KEY); }

/* ----------------------------------------------------------
   FIREBASE SETUP WIZARD  (shared UI — diperlukan di semua halaman)
   Callback: window._onFbReady() dipanggil setelah URL tersimpan/valid
   ---------------------------------------------------------- */
function setFbStatus(state, label) {
  const dot = document.getElementById('fb-dot');
  const lbl = document.getElementById('fb-status-label');
  if (dot) dot.className = 'fb-dot ' + state;
  if (lbl) lbl.textContent = label;
}

function openFbSetup() {
  const overlay = document.getElementById('fb-setup-overlay');
  const input   = document.getElementById('fb-url-input');
  if (input) input.value = FB_URL || '';
  const result  = document.getElementById('fb-test-result');
  if (result) result.style.display = 'none';
  if (overlay) overlay.classList.remove('hidden');
}

function closeFbSetup() {
  const overlay = document.getElementById('fb-setup-overlay');
  if (overlay) overlay.classList.add('hidden');
}

async function testFirebaseUrl() {
  const input  = document.getElementById('fb-url-input');
  const result = document.getElementById('fb-test-result');
  const btn    = document.querySelector('.fb-setup-btn-test');
  let url = (input.value || '').trim().replace(/\/+$/, '');
  if (!url) { input.classList.add('error'); input.focus(); return; }
  input.classList.remove('error');
  btn.textContent = 'Menguji...';
  btn.disabled = true;
  result.style.display = 'none';
  try {
    const res = await fetch(`${url}/.json?shallow=true`, { signal: AbortSignal.timeout(6000) });
    if (res.ok || res.status === 200) {
      result.className = 'fb-setup-test-result ok';
      result.innerHTML = '✓ Koneksi berhasil';
    } else if (res.status === 401 || res.status === 403) {
      result.className = 'fb-setup-test-result ok';
      result.innerHTML = '✓ Database ditemukan (periksa Rules jika ada error saat akses data)';
    } else {
      result.className = 'fb-setup-test-result fail';
      result.innerHTML = '✗ Gagal (HTTP ' + res.status + ')';
    }
  } catch (e) {
    result.className = 'fb-setup-test-result fail';
    result.innerHTML = '✗ Tidak dapat terhubung — periksa URL';
  } finally {
    result.style.display = 'flex';
    btn.textContent = 'Test Koneksi';
    btn.disabled = false;
  }
}

function saveFirebaseUrl() {
  const input = document.getElementById('fb-url-input');
  let url = (input.value || '').trim().replace(/\/+$/, '');
  if (!url) { input.classList.add('error'); input.focus(); return; }
  if (!url.startsWith('https://')) {
    input.classList.add('error');
    showToast('URL harus diawali dengan https://');
    return;
  }
  input.classList.remove('error');
  FB_URL = url;
  localStorage.setItem(FB_STORAGE_KEY, FB_URL);
  closeFbSetup();
  showToast('✓ Konfigurasi Firebase disimpan');
  setFbStatus('checking', 'Menghubungkan...');
  // Panggil callback halaman spesifik
  if (typeof window._onFbReady === 'function') window._onFbReady();
}

function initFirebase() {
  if (!FB_URL) {
    setFbStatus('disconnected', 'Belum terhubung');
    openFbSetup();
  } else {
    setFbStatus('checking', 'Menghubungkan...');
    if (typeof window._onFbReady === 'function') window._onFbReady();
  }
}

/* ----------------------------------------------------------
   NAVIGASI ANTAR HALAMAN
   goToPage  — dari halaman saat ini ke halaman HTML lain
   backTo    — kembali dengan URL langsung
   ---------------------------------------------------------- */
function goToPage(htmlFile, skFbKey) {
  if (skFbKey) setActiveSK(skFbKey);
  else clearActiveSK();
  window.location.href = htmlFile;
}
