//  // Tab functionality
//         function showTab(tabName) {
//             document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
//             document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));

//             document.getElementById(tabName).classList.add('active');
//             event.target.classList.add('active');

//             // Load data for the tab
//             if (tabName === 'volunteers') loadVolunteers();
//             else if (tabName === 'contacts') loadContacts();
//             else if (tabName === 'newsletter') loadNewsletter();
//             else if (tabName === 'blood') loadBloodDonors();
//         }

//         // Load stats
//         async function loadStats() {
//             try {
//                 const response = await fetch('/api/stats');
//                 const result = await response.json();

//                 if (result.success) {
//                     document.getElementById('volunteerCount').textContent = result.data.volunteers || 0;
//                     document.getElementById('contactCount').textContent = result.data.contacts || 0;
//                     document.getElementById('subscriberCount').textContent = result.data.subscribers || 0;
//                     document.getElementById('bloodCount').textContent = result.data.bloodDonors || 0;
//                 }
//             } catch (error) {
//                 console.error('Error loading stats:', error);
//             }
//         }

//         // Load volunteers
//         async function loadVolunteers() {
//             const container = document.getElementById('volunteersTable');

//             try {
//                 const response = await fetch('/api/volunteers');
//                 const result = await response.json();

//                 if (result.success && result.data.length > 0) {
//                     let html = `
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Phone</th>
//                                     <th>City</th>
//                                     <th>Skills</th>
//                                     <th>Availability</th>
//                                     <th>Joined</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                     `;

//                     result.data.forEach(volunteer => {
//                         html += `
//                             <tr>
//                                 <td>${volunteer.id}</td>
//                                 <td><strong>${volunteer.name}</strong></td>
//                                 <td>${volunteer.email}</td>
//                                 <td>${volunteer.phone}</td>
//                                 <td>${volunteer.city}, ${volunteer.state}</td>
//                                 <td>${volunteer.skills ? volunteer.skills.join(', ') : 'N/A'}</td>
//                                 <td>
//                                     <span class="status-badge ${volunteer.available ? 'status-available' : 'status-unavailable'}">
//                                         ${volunteer.available ? 'Available' : 'Unavailable'}
//                                     </span>
//                                 </td>
//                                 <td>${volunteer.joinedAt}</td>
//                             </tr>
//                         `;
//                     });

//                     html += '</tbody></table>';
//                     container.innerHTML = html;
//                 } else {
//                     container.innerHTML = `
//                         <div class="empty-state">
//                             <i class="fas fa-users"></i>
//                             <h3>No Volunteers Yet</h3>
//                             <p>Volunteer applications will appear here</p>
//                         </div>
//                     `;
//                 }
//             } catch (error) {
//                 container.innerHTML = '<div class="empty-state">Error loading volunteers</div>';
//             }
//         }

//         // Load contacts
//         async function loadContacts() {
//             const container = document.getElementById('contactsTable');

//             try {
//                 const response = await fetch('/api/contact');
//                 const result = await response.json();

//                 if (result.success && result.data.length > 0) {
//                     let html = `
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Phone</th>
//                                     <th>Interest</th>
//                                     <th>Message</th>
//                                     <th>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                     `;

//                     result.data.forEach(contact => {
//                         html += `
//                             <tr>
//                                 <td>${contact.id}</td>
//                                 <td><strong>${contact.name}</strong></td>
//                                 <td>${contact.email}</td>
//                                 <td>${contact.phone || 'N/A'}</td>
//                                 <td>${contact.interest || 'N/A'}</td>
//                                 <td>${contact.message ? contact.message.substring(0, 50) + '...' : 'N/A'}</td>
//                                 <td>${new Date(contact.createdAt).toLocaleDateString()}</td>
//                             </tr>
//                         `;
//                     });

//                     html += '</tbody></table>';
//                     container.innerHTML = html;
//                 } else {
//                     container.innerHTML = `
//                         <div class="empty-state">
//                             <i class="fas fa-envelope"></i>
//                             <h3>No Messages Yet</h3>
//                             <p>Contact form submissions will appear here</p>
//                         </div>
//                     `;
//                 }
//             } catch (error) {
//                 container.innerHTML = '<div class="empty-state">Error loading contacts</div>';
//             }
//         }

//         // Load newsletter
//         async function loadNewsletter() {
//             const container = document.getElementById('newsletterTable');

//             try {
//                 const response = await fetch('/api/newsletter');
//                 const result = await response.json();

//                 // Since GET /api/newsletter might not exist, we'll try to get from subscribers
//                 const statsResponse = await fetch('/api/stats');
//                 const stats = await statsResponse.json();

//                 if (stats.success && stats.data.subscribers > 0) {
//                     // Read subscribers.json directly via a workaround
//                     // Since no direct API, we'll show stats
//                     container.innerHTML = `
//                         <div class="empty-state">
//                             <i class="fas fa-newspaper"></i>
//                             <h3>${stats.data.subscribers} Subscribers</h3>
//                             <p>Newsletter subscription data is stored in the backend</p>
//                         </div>
//                     `;
//                 } else {
//                     container.innerHTML = `
//                         <div class="empty-state">
//                             <i class="fas fa-newspaper"></i>
//                             <h3>No Subscribers Yet</h3>
//                             <p>Newsletter subscribers will appear here</p>
//                         </div>
//                     `;
//                 }
//             } catch (error) {
//                 container.innerHTML = '<div class="empty-state">Error loading newsletter</div>';
//             }
//         }

//         // Load blood donors
//         async function loadBloodDonors() {
//             const container = document.getElementById('bloodTable');

//             try {
//                 const response = await fetch('/api/blood-donors');
//                 const result = await response.json();

//                 if (result.success && result.data.length > 0) {
//                     let html = `
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Name</th>
//                                     <th>Blood Type</th>
//                                     <th>Phone</th>
//                                     <th>Email</th>
//                                     <th>City</th>
//                                     <th>Status</th>
//                                     <th>Last Donated</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                     `;

//                     result.data.forEach(donor => {
//                         html += `
//                             <tr>
//                                 <td>${donor.id}</td>
//                                 <td><strong>${donor.name}</strong></td>
//                                 <td><span style="color: #e63946; font-weight: bold;">${donor.bloodType}</span></td>
//                                 <td>${donor.phone}</td>
//                                 <td>${donor.email}</td>
//                                 <td>${donor.city}, ${donor.state}</td>
//                                 <td>
//                                     <span class="status-badge ${donor.available ? 'status-available' : 'status-unavailable'}">
//                                         ${donor.available ? 'Available' : 'Unavailable'}
//                                     </span>
//                                 </td>
//                                 <td>${donor.lastDonated || 'N/A'}</td>
//                             </tr>
//                         `;
//                     });

//                     html += '</tbody></table>';
//                     container.innerHTML = html;
//                 } else {
//                     container.innerHTML = `
//                         <div class="empty-state">
//                             <i class="fas fa-tint"></i>
//                             <h3>No Blood Donors Yet</h3>
//                             <p>Blood donor registrations will appear here</p>
//                         </div>
//                     `;
//                 }
//             } catch (error) {
//                 container.innerHTML = '<div class="empty-state">Error loading blood donors</div>';
//             }
//         }

//         // Initial load
//         loadStats();
//         loadVolunteers();

const API_BASE = 'http://localhost:5000';

// ---------- TAB ----------
function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
    tab.style.display = 'none'; // force hide
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });

  const currentTab = document.getElementById(tabName);
  currentTab.classList.add('active');
  currentTab.style.display = 'block'; // force show

  event.target.classList.add('active');

  if (tabName === 'volunteers') loadVolunteers();
  else if (tabName === 'contacts') loadContacts();
  else if (tabName === 'newsletter') loadNewsletter();
  else if (tabName === 'blood') loadBloodDonors();
  else if (tabName === 'sos') loadSOS();
  else if (tabName === 'waste') loadWasteReports();
}

// ---------- STATS ----------
// async function loadStats() {
//   const res = await fetch(`${API_BASE}/api/stats`);
//   const data = await res.json();

//   if (data.success) {
//     document.getElementById('volunteerCount').textContent = data.data.volunteers;
//     document.getElementById('contactCount').textContent = data.data.contacts;
//     document.getElementById('subscriberCount').textContent = data.data.subscribers;
//     document.getElementById('bloodCount').textContent = data.data.bloodDonors;
//   }
// }

// ---------- VOLUNTEER ----------

async function loadVolunteers() {
  const container = document.getElementById('volunteersTable');

  try {
    const res = await fetch('http://localhost:5000/api/volunteer');
    const result = await res.json();

    const data = result.volunteers;

    if (result.success && data.length > 0) {
      let html = `
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Why Join</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach(v => {
        html += `
          <tr>
            <td>${v.name}</td>
            <td>${v.email}</td>
            <td>${v.phone}</td>
            <td>${v.city}</td>
            <td>${v.whyJoin || '-'}</td>
            <td style="color:${v.status === 'pending' ? 'orange' :
            v.status === 'approved' ? 'green' : 'red'
          }">
              ${v.status}
            </td>
            <td>
              ${v.status === 'pending'
            ? `
                  <button onclick="approveVolunteer('${v._id}')">Approve</button>
                  <button onclick="rejectVolunteer('${v._id}')">Reject</button>
                  `
            : '✔'
          }
            </td>
          </tr>
        `;
      });

      html += `</tbody></table>`;
      container.innerHTML = html;

    } else {
      container.innerHTML = "No volunteers yet";
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = "Error loading volunteers";
  }
}

async function approveVolunteer(id) {
  await fetch(`http://localhost:5000/api/volunteer/${id}/approve`, {
    method: 'PATCH'
  });
  loadVolunteers();
}

async function rejectVolunteer(id) {
  await fetch(`http://localhost:5000/api/volunteer/${id}/reject`, {
    method: 'PATCH'
  });
  loadVolunteers();
}

// ---------- NEWSLETTER ----------

async function loadNewsletter() {
  const res = await fetch(`${API_BASE}/api/newsletter`);
  const data = await res.json();

  const container = document.getElementById('newsletterTable');
  container.innerHTML = '';
  let html = `<table><thead>
  <tr><th>Email</th><th>Date</th></tr>
  </thead><tbody>`;

  data.data.forEach(sub => {
    html += `
    <tr>
      <td>${sub.email}</td>
      <td>${new Date(sub.createdAt).toLocaleString()}</td>
    </tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}
// ---------- CONTACT ----------

async function loadContacts() {
  const res = await fetch(`${API_BASE}/api/contact`);
  const data = await res.json();

  const container = document.getElementById('contactsTable');

  //   let html = `<table><thead>
  //   <tr><th>Name</th><th>Email</th><th>Message</th></tr>
  //   </thead><tbody>`;

  //   data.data.forEach(c => {
  //     html += `<tr>
  //       <td>${c.name}</td>
  //       <td>${c.email}</td>
  //       <td>${c.message}</td>
  //     </tr>`;
  //   });
  container.innerHTML = '';

  let html = `<table><thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Phone</th>

<th>Message</th>
<th>Date</th>
</tr>
</thead><tbody>`;

  data.data.forEach(c => {
    html += `<tr>
    <td>${c.name}</td>
    <td>${c.email}</td>
    <td>${c.phone || '-'}</td>
    
    <td>${c.message}</td>
    <td>${new Date(c.createdAt).toLocaleString()}</td>
  </tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

// ---------- SOS ----------

async function loadSOS() {
  const res = await fetch(`${API_BASE}/api/sos`);
  const data = await res.json();

  const container = document.getElementById('sosTable');

  let html = `<table><thead>
  <tr>
    <th>Type</th>
    <th>Name</th>
    <th>Phone</th>
    <th>Location</th>
    <th>Status</th>
    <th>Time</th>
    <th>Action</th>
  </tr>
  </thead><tbody>`;

  data.data.forEach(item => {
    html += `
    <tr>
      <td>${item.type}</td>
      <td>${item.name || '-'}</td>
      <td>${item.phone || '-'}</td>
      <td>
        ${item.location && item.location.includes(',')
        ? `<a href="https://www.google.com/maps?q=${item.location}" target="_blank">
                View
             </a>`
        : item.location
      }
      </td>
      <td style="color:${item.status === 'pending' ? 'orange' : 'green'}">
        ${item.status}
      </td>
      <td>${new Date(item.createdAt).toLocaleString()}</td>
      <td>
        ${item.status === 'pending'
        ? `<button onclick="resolveSOS('${item._id}')">Resolve</button>`
        : '✔'
      }
      </td>
    </tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

async function resolveSOS(id) {
  await fetch(`${API_BASE}/api/sos/${id}`, { method: 'PUT' });
  loadSOS();
}
// ---------- WASTE ----------

async function loadWasteReports() {
  const res = await fetch(`${API_BASE}/api/waste`);
  const data = await res.json();

  const container = document.getElementById('wasteTable');
  //if nothing present show it will show
  if (!data.data.length) {
    container.innerHTML = "No waste reports yet";
    return;
  }
  let html = `<table>
    <thead>
      <tr>
        <th>Image</th>
        <th>Issue</th>
        <th>Address</th>
        <th>Location</th>
        <th>Description</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>`;

  data.data.forEach(item => {
    html += `
      <tr>
        <td>
          <a href="${API_BASE}/uploads/${item.image}" target="_blank">Open Img</a>
        </td>
        <td>${item.issueType}</td>
        <td>${item.address}</td>
        <td>
          <a href="https://www.google.com/maps?q=${item.latitude},${item.longitude}" target="_blank">
            View
          </a>
        </td>
        <td>${item.description || '-'}</td>
        <td>${new Date(item.createdAt).toLocaleString()}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

// ---------- INIT ----------
loadStats();
loadVolunteers();