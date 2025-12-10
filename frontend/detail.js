const API = "http://localhost:3000";
const id = new URLSearchParams(location.search).get("id");
const userId = Number(localStorage.getItem("userId"));
let currentNews;

Promise.all([
  fetch(API + "/news/" + id).then(r => r.json()),
  fetch(API + "/users").then(r => r.json())
]).then(([news, users]) => {
  currentNews = news;
  title.innerText = news.title;
  body.innerText = news.body;
  author.innerText = "Author: " + users.find(u => u.id === news.author_id).name;

  news.comments.forEach(c => {
    const li = document.createElement("li");
    li.innerText =
      users.find(u => u.id === c.user_id).name + ": " + c.text;
    comments.appendChild(li);
  });
});

function addComment() {
  currentNews.comments.push({
    id: Date.now(),
    text: commentText.value,
    user_id: userId,
    timestamp: new Date().toISOString()
  });

  fetch(API + "/news/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comments: currentNews.comments })
  }).then(() => location.reload());
}
