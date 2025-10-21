// ===== Modal Controls =====
function showForgot() {
  console.log("Show forgot modal triggered");
}

function showLogin() {
  alert("Back to login clicked!");
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