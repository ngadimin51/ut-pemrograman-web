function greeting() {
  const now = new Date()
  const hours = now.getHours()

  if (hours >= 5 && hours < 12) {
    return "Selamat pagi!"
  } else if (hours >= 12 && hours < 15) {
    return "Selamat siang!"
  } else if (hours >= 15 && hours < 18) {
    return "Selamat sore!"
  } else {
    return "Selamat malam!"
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Ucapkan salam
  const element = document.querySelector("#greeting")
  element.innerHTML = greeting()

  // element timeline, default hidden
  const elmTracking = document.querySelector("#timeline")
  elmTracking.style.display = "none";

  // element input, hanya bisa menerima input nomor DO "123456"
  const elmInput = document.querySelector("input[name='tracking']")

  // Halaman Tracking
  if (window.location.href.includes("tracking")) {
    const queryString = window.location.search; 
    const params = new URLSearchParams(queryString);
    const tracking = params.get('tracking');
    if (tracking) {
      elmInput.value = tracking
      elmTracking.style.display = "block";
      tampilkanTimeline(tracking)
    }
  }

  // handle submit tracking
  // jika halaman aktif adalah dashboard, maka redirect ke tracking
  const formTracking = document.querySelector('#formTracking')
  formTracking.addEventListener("submit", (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const no_do = f.get("tracking")
    if (!no_do) {
      return callModal("show", "Silahkan isi nomor tracking")
    }
    window.location.href = `/tracking.html?tracking=${no_do}`
  })

  // menampilkan data dari json
  function tampilkanTimeline(nomorDO) {
    const data = dataTracking[nomorDO];
    console.log(data)
    console.log(elmTracking)

    if (!data) {
      elmTracking.innerHTML = `
        <div class="p-8 text-center">
          Data tracking tidak ditemukan
        </div>
      `;
      return;
    }

    let perjalananHtml = "";

    data.perjalanan.forEach((item, index) => {

      let statusClass = "done";

      if (index === data.perjalanan.length - 1 &&
        data.status !== "Selesai") {
        statusClass = "active";
      }

      perjalananHtml += `
        <div class="timeline-item ${statusClass}">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-title">
              ${item.keterangan}
            </div>
            <div class="timeline-time">
              ${item.waktu}
            </div>
          </div>
        </div>
      `;
    });

    elmTracking.innerHTML = `
      <div class="bg-blue-500 p-4 mb-4 rounded-md shadow">
        <h2 class="text-center text-2xl font-bold mb-4">
          ${data.nama}
        </h2>
          <div class="shipment-info text-center">
              <div class="info-item">
                <span class="info-label">Nomor DO</span>
                <span class="info-value">
                  ${data.nomorDO}
                </span>
              </div>

              <div class="info-item">
                <span class="info-label">Status</span>
                <span class="info-value">
                  ${data.status}
                </span>
              </div>

              <div class="info-item">
                <span class="info-label">Ekspedisi</span>
                <span class="info-value">
                  ${data.ekspedisi}
                </span>
              </div>

              <div class="info-item">
                <span class="info-label">Tanggal Kirim</span>
                <span class="info-value">
                  ${data.tanggalKirim}
                </span>
              </div>

            <div class="info-item">
              <span class="info-label">Jenis Paket</span>
              <span class="info-value">
                ${data.paket}
              </span>
            </div>

            <div class="info-item">
              <span class="info-label">Total Pembayaran</span>
              <span class="info-value font-bold text-red-500 bg-white px-2 rounded-full">
                ${data.total}
              </span>
            </div>
          </div>
        </div>

        <div class="timeline">
            ${perjalananHtml}
        </div>
    `;

    // LOOP element untuk mengaktifkan hover
    const elmTimeline = document.querySelectorAll(".timeline-item")
    elmTimeline.forEach( elm => {
      // Saat kursor masuk ke elemen (hover)
      if (elm.classList.contains("done")) {
        elm.addEventListener("mouseenter", () => {
          elm.classList.add("active");
        });
    
        // Saat kursor keluar dari elemen
        elm.addEventListener("mouseleave", () => {
          elm.classList.remove("active");
        });
      }
    })
  }

  // UI MODAL
  const modal = document.getElementById("myModal");
  const messageElement = document.querySelector("#ModalMessage");
  var span = document.getElementsByClassName("close")[0];

  // pangggil / tutup modal
  function callModal(action, message) {
    // Mengubah nilai message
    messageElement.innerHTML = message || "";
    // Mengatur visibilitas modal
    if (action === "close") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  }

  span.addEventListener("click", () => {
     callModal("close", "")
  })
})