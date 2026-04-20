const API = "http://85.215.229.230:9389";

let isAdmin = false;

// 🔥 SAFE FETCH (error handle karega)
async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Server error: " + res.status);
    }

    return await res.json();
  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  }
}

// ================= LOGIN =================
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  const data = await safeFetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  if (!data) return;

  if (data.status === "success") {
    document.getElementById("auth").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    isAdmin = data.is_admin;
    document.getElementById("authResult").innerText = "Login Success ✅";

    loadGuilds();
  } else {
    document.getElementById("authResult").innerText = "Login Failed ❌";
  }
}

// ================= REGISTER =================
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  const data = await safeFetch(API + "/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  if (!data) return;

  if (data.status === "registered") {
    document.getElementById("authResult").innerText = "Registered Successfully ✅";
  } else {
    document.getElementById("authResult").innerText = JSON.stringify(data);
  }
}

// ================= LOAD GUILDS =================
async function loadGuilds() {
  const data = await safeFetch(API + "/guilds");

  if (!data) return;

  const container = document.getElementById("guilds");
  container.innerHTML = "";

  data.guilds.forEach(g => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${g.name}</h3><p>ID: ${g.id}</p>`;
    container.appendChild(div);
  });
}

// ================= ADMIN PANEL =================
async function loadUsers() {
  if (!isAdmin) {
    alert("Not admin ❌");
    return;
  }

  const data = await safeFetch(API + "/admin/users");

  if (!data) return;

  const container = document.getElementById("users");
  container.innerHTML = "";

  data.users.forEach(u => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<p>${u[0]} (Admin: ${u[1]})</p>`;
    container.appendChild(div);
  });
}
