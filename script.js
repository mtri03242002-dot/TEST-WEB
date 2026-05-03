const intro = document.getElementById("intro");
const main = document.getElementById("mainContent");

setTimeout(() => {
  intro.style.display = "none";
  main.classList.remove("hidden");
}, 3000);

// MENU
function toggleMenu() {
  document.getElementById("menu").classList.toggle("hidden");
}

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// ĐỔI TÊN
function changeName() {
  const name = prompt("Nhập tên mới:");
  if (name) {
    document.getElementById("siteName").innerText = name;
    document.getElementById("title").innerText = name;
  }
}

// UPLOAD + PREVIEW + SAVE
const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const gallery = document.getElementById("gallery");

let images = JSON.parse(localStorage.getItem("images")) || [];

function renderImages() {
  gallery.innerHTML = "";
  images.forEach((src, index) => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = src;

    const btn = document.createElement("button");
    btn.innerText = "X";
    btn.className = "delete";
    btn.onclick = () => deleteImage(index);

    div.appendChild(img);
    div.appendChild(btn);
    gallery.appendChild(div);
  });
}

renderImages();

upload.addEventListener("change", function () {
  preview.innerHTML = "";

  const files = this.files;

  for (let file of files) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // preview
      const img = document.createElement("img");
      img.src = e.target.result;
      preview.appendChild(img);

      // save
      images.push(e.target.result);
      localStorage.setItem("images", JSON.stringify(images));

      renderImages();
    };

    reader.readAsDataURL(file);
  }
});

// DELETE
function deleteImage(index) {
  images.splice(index, 1);
  localStorage.setItem("images", JSON.stringify(images));
  renderImages();
}

// CLEAR
function clearImages() {
  if (confirm("Xóa hết ảnh?")) {
    images = [];
    localStorage.removeItem("images");
    renderImages();
  }
}
