const API = "http://localhost:3000";

fetch(API + "/users")
  .then(res => res.json())
  .then(users => {
    const select = document.getElementById("userSelect");
    users.forEach(user => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      select.appendChild(option);
    });
  });

function login() {
  const id = document.getElementById("userSelect").value;
  localStorage.setItem("userId", id);
  window.location.href = "news.html";
}
