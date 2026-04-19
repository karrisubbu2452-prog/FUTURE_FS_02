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

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}


// 📥 LOAD CUSTOMERS
async function loadCustomers() {
  const res = await fetch(BASE_URL + "/data");
  const data = await res.json();

  const table = document.getElementById("table");

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
        <button onclick="editCustomer('${user._id}', '${user.name}', '${user.email}', '${user.phone || ""}')">Edit</button>
        <button onclick="deleteCustomer('${user._id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}


// ❌ DELETE
async function deleteCustomer(id) {
  await fetch(BASE_URL + "/delete/" + id, {
    method: "DELETE"
  });

  loadCustomers();
}


// ✏️ EDIT (UPDATE)
async function editCustomer(id, oldName, oldEmail, oldPhone) {
  const name = prompt("Enter new name", oldName);
  const email = prompt("Enter new email", oldEmail);
  const phone = prompt("Enter new phone", oldPhone);

  if (!name || !email) return;

  await fetch(BASE_URL + "/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, phone })
  });

  loadCustomers();
}


// 🔍 SEARCH
function searchCustomer() {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#table tr");

  rows.forEach((row, index) => {
    if (index === 0) return;

    const name = row.children[0].innerText.toLowerCase();

    row.style.display = name.includes(input) ? "" : "none";
  });
}


// 🔄 AUTO LOAD
loadCustomers();