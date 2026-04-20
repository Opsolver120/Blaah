async function loadGuilds() {
  const res = await fetch("http://85.215.229.230:9389/guilds");
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

// 🔥 AUTO LOAD
loadGuilds();
