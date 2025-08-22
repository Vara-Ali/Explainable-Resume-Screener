const API_URL = "http://127.0.0.1:8000/api";

export async function parseResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/parse`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to parse resume");
  return res.json();
}

export async function summarizeResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/summarize`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to summarize resume");
  return res.json();
}

export async function scoreResume(file, jobDesc) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("job_desc", jobDesc);

  const res = await fetch(`${API_URL}/score`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to score resume");
  return res.json();
}
