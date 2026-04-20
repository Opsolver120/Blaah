const API = "http://85.215.229.230:9389";

let isAdmin = false;

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.status === "success") {
    document.getElementById("auth").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    isAdmin = data.is_admin;
    document.getElementById("authResult").innerText = "Login Success ✅";
  } else {
    document.getElementById("authResult").innerText = "Login Failed ❌";
  }
}

// REGISTER
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("authResult").innerText = JSON.stringify(data);
}

// LOAD GUILDS
async function loadGuilds() {
  const res = await fetch(API + "/guilds");
  const data = await res.json();

  const container = document.getElementById("guilds");
  container.innerHTML = "";

  data.guilds.forEach(g => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${g.name}</h3><p>ID: ${g.id}</p>`;
    container.appendChild(div);
  });
}

// ADMIN PANEL
async function loadUsers() {
  if (!isAdmin) {
    alert("Not admin ❌");
    return;
  }

  const res = await fetch(API + "/admin/users");
  const data = await res.json();

  const container = document.getElementById("users");
  container.innerHTML = "";

  data.users.forEach(u => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<p>${u[0]} (Admin: ${u[1]})</p>`;
    container.appendChild(div);
  });
}
