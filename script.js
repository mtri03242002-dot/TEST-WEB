let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentImage = "";

// HIỂN THỊ
function render() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <img src="${p.img}">
      <p>${p.caption}</p>
    `;

    feed.appendChild(div);
  });
}

render();

// CHỌN ẢNH
document.getElementById("upload").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    currentImage = e.target.result;
    document.getElementById("previewImg").src = currentImage;
    document.getElementById("previewBox").classList.remove("hidden");
  };

  reader.readAsDataURL(file);
});

// ĐĂNG BÀI
function confirmPost() {
  const caption = document.getElementById("caption").value;

  posts.unshift({
    img: currentImage,
    caption
  });

  localStorage.setItem("posts", JSON.stringify(posts));

  closePreview();
  render();
}

// ĐÓNG POPUP
function closePreview() {
  document.getElementById("previewBox").classList.add("hidden");
  document.getElementById("caption").value = "";
  currentImage = "";
  document.getElementById("upload").value = "";
}

// CLICK RA NGOÀI → ĐÓNG
function outsideClick(e) {
  if (e.target.id === "previewBox") {
    closePreview();
  }
}

// DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
}
document.getElementById("previewBox").onclick = function () {
  closePreview();
};
