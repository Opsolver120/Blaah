export default async function handler(req, res) {
  const target = "http://85.215.229.230:9389";

  const path = req.url.replace(/^\/api/, "");
  const url = target + path;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });

    const data = await response.text();

    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
