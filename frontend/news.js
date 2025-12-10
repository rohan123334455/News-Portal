const API = "http://localhost:3000";
const userId = localStorage.getItem("userId");
if (!userId) window.location.href = "login.html";

fetch(API + "/users/" + userId)
  .then(res => res.json())
  .then(user => {
    document.getElementById("loggedUser").innerText =
      "Logged in as: " + user.name;
  });

Promise.all([
  fetch(API + "/news").then(r => r.json()),
  fetch(API + "/users").then(r => r.json())
]).then(([news, users]) => {
  const ul = document.getElementById("newsList");
  news.forEach(n => {
    const author = users.find(u => u.id === n.author_id);
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${n.title}</b> by ${author.name}
      <button onclick="view(${n.id})">View</button>
      ${n.author_id == userId ? `
        <button onclick="edit(${n.id})">Edit</button>
        <button onclick="remove(${n.id})">Delete</button>
      ` : ""}
    `;
    ul.appendChild(li);
  });
});

function view(id) { window.location = "detail.html?id=" + id; }
function edit(id) { window.location = "edit.html?id=" + id; }
function createNews() { window.location = "create.html"; }

function remove(id) {
  fetch(API + "/news/" + id, { method: "DELETE" })
    .then(() => location.reload());
}
