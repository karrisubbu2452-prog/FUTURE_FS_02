const API = "http://localhost:5000";

// ================= ADD =================
async function addCustomer() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!name || !email || !phone) {
    alert("All fields required");
    return;
  }

  await fetch(`${API}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      status: "new"
    })
  });

  // clear inputs
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

  loadData();
}


// ================= LOAD =================
async function loadData() {
  const res = await fetch(`${API}/data`);
  const data = await res.json();

  const table = document.getElementById("table");

  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  `;

  data.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.status || "new"}</td>
        <td>
          <button onclick="updateStatus('${c._id}')">Contacted</button>
          <button onclick="deleteCustomer('${c._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}


// ================= UPDATE =================
async function updateStatus(id) {
  await fetch(`${API}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      status: "contacted"
    })
  });

  loadData();
}


// ================= DELETE =================
async function deleteCustomer(id) {
  await fetch(`${API}/delete/${id}`, {
    method: "DELETE"
  });

  loadData();
}


// ================= AUTO LOAD =================
loadData();