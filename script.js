const API = "/api";

// message show function
function showMessage(msg, isError = false) {
  const box = document.getElementById("msg");
  box.innerText = msg;
  box.style.color = isError ? "red" : "lightgreen";
}

// 🔐 Register
async function register() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const res = await fetch(API + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.error) {
    showMessage(data.error, true);
  } else {
    showMessage("✅ Registered successfully");
  }
}

// 🔑 Login
async function login() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.error) {
    showMessage(data.error, true);
  } else {
    showMessage("✅ Login successful");

    // 👉 dashboard load
    loadServers();
  }
}

// 📦 Load servers
async function loadServers() {
  const res = await fetch(API + "/guilds");
  const data = await res.json();

  const container = document.getElementById("servers");
  container.innerHTML = "";

  data.guilds.forEach(g => {
    const div = document.createElement("div");
    div.innerText = g.name;
    container.appendChild(div);
  });
}
