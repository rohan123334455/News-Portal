const API = "http://localhost:3000";
const id = new URLSearchParams(location.search).get("id");

fetch(API + "/news/" + id)
  .then(res => res.json())
  .then(news => {
    title.value = news.title;
    body.value = news.body;
  });

function update() {
  fetch(API + "/news/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      body: body.value
    })
  }).then(() => window.location = "news.html");
}
