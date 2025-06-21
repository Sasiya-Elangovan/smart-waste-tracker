const apiURL = 'http://localhost:5000/api/pickups';
const form = document.getElementById('pickupForm');
const list = document.getElementById('pickupList');

function loadPickups() {
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      list.innerHTML = '';
      data.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${p.houseNumber}</td>
          <td>${new Date(p.date).toLocaleDateString()}</td>
          <td>${p.wasteType || 'Not set'}</td>
          <td>${p.status}</td>
          <td>${p.feedback}</td>
          <td>
            <button class="update-btn" onclick="editPickup('${p._id}')">Edit</button>
            <button class="delete-btn" onclick="deletePickup('${p._id}')">Delete</button>
          </td>
        `;
        list.appendChild(row);
      });
    });
}

form.onsubmit = async (e) => {
  e.preventDefault();

  const pickup = {
    houseNumber: form.houseNumber.value,
    date: form.date.value,
    wasteType: form.wasteType.value,
    status: form.status.value,
    feedback: form.feedback.value
  };

  const id = document.getElementById('pickupId').value;

  if (id) {
    // Update mode
    await fetch(`${apiURL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pickup)
    });
  } else {
    // Create mode
    await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pickup)
    });
  }

  form.reset();
  document.getElementById('pickupId').value = ''; 
  loadPickups();
};

async function deletePickup(id) {
  await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
  loadPickups();
}

async function editPickup(id) {
  const res = await fetch(`${apiURL}/${id}`);
  const data = await res.json();

  document.getElementById('pickupId').value = data._id;
  form.houseNumber.value = data.houseNumber;
  form.date.value = data.date.split('T')[0]; 
  form.wasteType.value = data.wasteType;
  form.status.value = data.status;
  form.feedback.value = data.feedback;
}

loadPickups();
