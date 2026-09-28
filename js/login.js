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
});