// Show Forgot Password modal
function showForgot() {
  const loginModal = document.getElementById('loginModal');
  const forgotModal = document.getElementById('forgotModal');

  if (loginModal && forgotModal) {
    loginModal.classList.remove('active');
    forgotModal.classList.add('active');
  } else {
    console.error("Modal elements not found. Check your IDs.");
  }
}

// Show Login modal again
function showLogin() {
  const loginModal = document.getElementById('loginModal');
  const forgotModal = document.getElementById('forgotModal');

  if (loginModal && forgotModal) {
    forgotModal.classList.remove('active');
    loginModal.classList.add('active');
  } else {
    console.error("Modal elements not found. Check your IDs.");
  }
}

// ===== Display Application Details =====
function showApplicationDetails(data) {
  const detailsDiv = document.getElementById("applicationDetails");
  detailsDiv.innerHTML = ""; // clear previous data

  if (!data || Object.keys(data).length === 0) {
    detailsDiv.innerHTML = `<div class="alert error">NO DATA FOUND</div>`;
  } else {
    detailsDiv.innerHTML = `
      <div class="alert success">
        <p><strong>Application No:</strong> ${data.applicationNo}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Status:</strong> ${data.status}</p>
      </div>
    `;
  }
}

// ===== Run Example Data on Page Load =====
document.addEventListener("DOMContentLoaded", () => {
  const exampleData = {
    applicationNo: "21-12345",
    name: "Juan Dela Cruz",
    email: "juan@email.com",
    status: "Verified"
  };

  showApplicationDetails(exampleData);
});

