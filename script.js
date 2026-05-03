let posts = JSON.parse(localStorage.getItem("posts")) || [];

function save() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function render() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <img src="${p.img}">
      <div class="actions">
        <p>${p.caption}</p>
        ❤️ ${p.likes}
        <button onclick="likePost(${index})">Like</button>
        <button onclick="deletePost(${index})">Xóa</button>

        <div>
          ${p.comments.map(c => `<p>💬 ${c}</p>`).join("")}
        </div>

        <div class="commentBox">
          <input id="c${index}" placeholder="Comment...">
          <button onclick="addComment(${index})">Gửi</button>
        </div>
      </div>
    `;

    feed.appendChild(div);
  });
}

render();

function addPost() {
  const file = document.getElementById("upload").files[0];
  const caption = document.getElementById("caption").value;

  if (!file) return alert("Chọn ảnh");

  const reader = new FileReader();

  reader.onload = function(e) {
    posts.unshift({
      img: e.target.result,
      caption,
      likes: 0,
      comments: []
    });

    save();
    render();
  };

  reader.readAsDataURL(file);
}

function likePost(i) {
  posts[i].likes++;
  save();
  render();
}

function deletePost(i) {
  posts.splice(i, 1);
  save();
  render();
}

function addComment(i) {
  const input = document.getElementById("c" + i);
  if (input.value) {
    posts[i].comments.push(input.value);
    input.value = "";
    save();
    render();
  }
}

function toggleDark() {
  document.body.classList.toggle("dark");
}
