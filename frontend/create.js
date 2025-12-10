const API = "http://localhost:3000";

function save() {
  fetch(API + "/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      body: body.value,
      author_id: Number(localStorage.getItem("userId")),
      comments: []
    })
  }).then(() => window.location = "news.html");
}
