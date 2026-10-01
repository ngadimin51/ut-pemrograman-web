  /**
   * VALIDASI
   */
function validasiInput(data, type) {
  if (!data) {
    return {
      valid: false,
      message: `Data ${type} harus diisi`
    }
  }

  const string = String(data).trim()

  // validasi jika email
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (type === "email" && !pattern.test(string)) {
    return {
      valid: false,
      message: "Format email tidak valid"
    }
  }

  return {
    valid: true,
    message: "Silahkan melanjutkan"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  /**
   * ELEMENT LOGIN
   */
  const formLogin = document.querySelector('#formLogin')
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const email = f.get("email")
    const password = f.get("password")

    const checkEmail = validasiInput(email, "email")
    const checkPassword = validasiInput(password, "password")

    if (!checkEmail.valid) {
      return callModal("show", checkEmail.message)
    }

    if (!checkPassword.valid) {
      return callModal("show", checkPassword.message)
    }

    const data = dataPengguna.filter( a => a.email === email)
    if (data.length !== 1) {
      return callModal("show", "Data tidak ditemukan")
    }

    if (data[0].password !== password) {
      return callModal("show", "Password tidak valid")
    }

    callModal("show", `Selamat datang ${data[0].nama}`)

    setTimeout(() => {
      window.location.href = "/dashboard.html"
    }, 1000)
  })

  // UI MODAL KHUSUS LOGIN
  const modal = document.querySelector("#myModal");
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

  // lupa password
  const triggerLupa = document.querySelector('#lupa')
  triggerLupa.addEventListener("click", (e) => {
    e.preventDefault()
    toggleModalDinamis("lupaPassword")
  })
  // Form Lupa Password
  const formLupa = document.getElementById("formLupaPassword")
  formLupa.addEventListener("submit", (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const email = f.get("email")
    const data = dataPengguna.filter(pengguna => pengguna.email === email)
    if (data.length !== 1)
      return alert("Data tidak ditemukan")
    alert(`Password anda "${data[0].password}"`)
    toggleModalDinamis("formLupaPassword")
  })

  // register
  const triggerDaftar = document.querySelector('#daftar')
  triggerDaftar.addEventListener("click", (e) => {
    e.preventDefault()
    toggleModalDinamis("register")
  })
  const register = document.getElementById("formRegister")
  register.addEventListener("submit", (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const nama = f.get("nama")
    const email = f.get("email")
    const password = f.get("pasword")
    const role = f.get("role")
    const lokasi = f.get("lokasi")
    const data = dataPengguna.filter(pengguna => pengguna.email === email)
    if (data.length > 0)
      return alert("Email sudah terdaftar")
    dataPengguna.push({
      id: dataPengguna.length,
      nama, email, password, role, lokasi
    })
    toggleModalDinamis("register")
    alert("Berhasil, silahkan gunakan data anda untuk LOGIN")
  })

  function toggleModalDinamis(id) {
    const elm = document.querySelector(`#${id}`)
    const display = elm.style.display
    if (display === "block") {
      return elm.style.display = "none";
    } else {
      elm.style.display = "block";
    }
    // Cari span.close di dalam elm tanpa perlu forEach childNodes
    const closeSpan = elm.querySelector('div.modal-content-sm span.close');
    if (closeSpan) {
      closeSpan.addEventListener("click", () => {
        elm.style.display = "none";
      }, { once: true }); // Menggunakan { once: true } agar event listener tidak menumpuk setiap kali modal di-toggle
    }
  }
});