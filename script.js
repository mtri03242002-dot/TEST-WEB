// VIDEO INTRO
const intro = document.getElementById("intro");
const main = document.getElementById("mainContent");

setTimeout(() => {
  intro.style.display = "none";
  main.classList.remove("hidden");
}, 4000); // video chạy 4 giây

// MENU
function toggleMenu() {
  document.getElementById("menu").classList.toggle("hidden");
}

// SETTINGS
function openSettings() {
  alert("Setting đang phát triển 😄");
}

// UPLOAD IMAGE
const upload = document.getElementById("upload");
const gallery = document.getElementById("gallery");

upload.addEventListener("change", function () {
  const files = this.files;

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// MENU FUNCTIONS
function changeBackground() {
  document.body.style.background =
    "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function clearImages() {
  gallery.innerHTML = "";
}