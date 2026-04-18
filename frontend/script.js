const BASE_URL = "https://mini-crm-backend-ilcq.onrender.com";

// ➕ ADD CUSTOMER
async function addCustomer() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!name || !email || !phone) {
    alert("Please fill all fields");
    return;
  }

  await fetch(BASE_URL + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, phone })
  });

  loadCustomers();

  // clear inputs
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}


// 📥 LOAD CUSTOMERS
async function loadCustomers() {
  const res = await fetch(BASE_URL + "/data");
  const data = await res.json();

  const table = document.getElementById("table");

  // reset table (keep header)
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  `;

  data.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone || ""}</td>
      <td>${user.status}</td>
      <td>
        <button onclick="deleteCustomer('${user._id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}


// ❌ DELETE CUSTOMER
async function deleteCustomer(id) {
  await fetch(BASE_URL + "/delete/" + id, {
    method: "DELETE"
  });

  loadCustomers();
}


// 🔍 SEARCH
function searchCustomer() {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#table tr");

  rows.forEach((row, index) => {
    if (index === 0) return; // skip header

    const name = row.children[0].innerText.toLowerCase();

    row.style.display = name.includes(input) ? "" : "none";
  });
}


// 🔄 AUTO LOAD
loadCustomers();