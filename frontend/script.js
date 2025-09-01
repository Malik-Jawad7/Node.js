const API_URL = "http://localhost:3000"; // tumhara backend chal raha hai

// Register
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, email, password }),
  });

  const data = await res.json();
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
});

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);

  if (data.token) {
    localStorage.setItem("token", data.token); // token save future requests ke liye
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/logout`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // token bhejna hoga
    },
    body: JSON.stringify({}),
  });

  const data = await res.json();
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);

  localStorage.removeItem("token"); // token hata do
});
``