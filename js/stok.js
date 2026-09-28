function showBahanAjar(index) {
  // cegah index diluar range array dataBahanAjar
  if (index >= dataBahanAjar.length) {
    index = 0
  } else if (index < 0) {
    index = dataBahanAjar.length - 1
  }
  // cari data
  const item = dataBahanAjar[index];
  // tentukan element target
  const target = document.getElementById("StokBahanAjar");
  // manipulasi innerHTML
  target.innerHTML = `
    <div class="bg-gray-100 container rounded-md p-6">
      <div class="flex justify-between mb-4">
        <button id="prevButton">‹ prev</button>
        <button id="nextButton">next ›</button>
      </div>
      <div class="flex justify-center mb-4">
        <img src="/assets/${item.cover}" alt="${item.namaBarang}">
      </div>
      <div class="grid grid-cols-3 gap-2">
        <div class="flex flex-col">
          <label for="">Kode Lokasi</label>
          <input type="text" value="${item.kodeLokasi}" class="p-2 bg-gray-200 border-0 rounded-md" disabled>
        </div>
        <div class="flex flex-col">
          <label for="">Kode Barang</label>
          <input type="text" value="${item.kodeBarang}" class="p-2 bg-gray-200 border-0 rounded-md" disabled>
        </div>
        <div class="flex flex-col">
          <label for="">Nama Barang</label>
          <input type="text" value="${item.namaBarang}" class="p-2 bg-gray-200 border-0 rounded-md" disabled>
        </div>
        <div class="flex flex-col">
          <label for="">Jenis Barang</label>
          <input type="text" value="${item.jenisBarang}" class="p-2 bg-gray-200 border-0 rounded-md" disabled>
        </div>
        <div class="flex flex-col">
          <label for="">Edisi</label>
          <input type="text" value="${item.edisi}" class="p-2 bg-gray-200 border-0 rounded-md" disabled>
        </div>
        <div class="flex flex-col">
          <label for="">Stok</label>
          <input type="text" value="${item.stok}" class="p-2 bg-gray-200 border-0 rounded-md" disabled>
        </div>
      </div>
      <div class="flex justify-center mt-4">
        <button id="tambahBahan" class="bg-orange-500 text-xl p-4 rounded-md">tambah data</button>
      </div>
    </div>
  `;
  // next/prev
  const nextButton = document.querySelector("#nextButton")
  const prevButton = document.querySelector("#prevButton")
  nextButton.addEventListener("click", () => {
    showBahanAjar(index + 1)
  })
  prevButton.addEventListener("click", () => {
    showBahanAjar(index - 1)
  })

  // button tambah stok
  const btnTambah = document.querySelector("#tambahBahan")
  btnTambah.addEventListener("click", () => {
    toggleModal()
  })
}

function toggleModal() {
  const modal = document.querySelector("#myModal")
  if (modal.style.display === "block") {
    modal.style.display = "none"
  } else {
    modal.style.display = "block"
  }

  const span = document.querySelector(".close")
  span.addEventListener("click", toggleModal)
}

window.addEventListener("DOMContentLoaded", () => {
  showBahanAjar(0)

  const FormStok = document.querySelector("#FormTambahStok")
  FormStok.addEventListener("submit", (e) => {
    e.preventDefault()
    const f = new FormData(FormStok)
    const kodeLokasi = f.get("kodeLokasi")
    const kodeBarang = f.get("kodeBarang")
    const namaBarang = f.get("namaBarang")
    const jenisBarang = f.get("jenisBarang")
    const edisi = f.get("edisi")
    const stok = f.get("stok")
    if (!kodeLokasi) {
      return alert("Tentukan Kode Lokasi")
    }
    if (!kodeBarang) {
      return alert("Tentukan Kode Barang")
    }
    if (!namaBarang) {
      return alert("Tentukan Nama Barang")
    }
    if (!jenisBarang) {
      return alert("Tentukan Jenis Barang")
    }
    if (!edisi || isNaN(Number(edisi))) {
      return alert("Tentukan Edisi (angka)")
    }
    if (!stok || isNaN(Number(stok)) || Number(stok) < 0) {
      return alert("Stok tidak boleh kosong atau minus (angka)")
    }
    dataBahanAjar.push({
      kodeLokasi, kodeBarang, namaBarang, jenisBarang,
      edisi: Number(edisi), stok: Number(stok),
      cover: "img/blank.jpg"
    })
    showBahanAjar(dataBahanAjar.length - 1)
    toggleModal()
  })
})