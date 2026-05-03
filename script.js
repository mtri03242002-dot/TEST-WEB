let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentImage = "";

// RENDER
function render() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <img src="${p.img}">
      <p style="padding:10px">${p.caption}</p>
    `;

    feed.appendChild(div);
  });
}
render();

// CHỌN ẢNH → HIỆN PREVIEW
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

// ĐĂNG
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

// ĐÓNG PREVIEW
function closePreview() {
  document.getElementById("previewBox").classList.add("hidden");
  document.getElementById("caption").value = "";
}

// DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
}
