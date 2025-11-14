document.querySelectorAll('.grade-card').forEach(card => {
  card.addEventListener('click', () => {
    alert('Downloading form...');
  });
});

// ====== Map pages to step index ======
const pageToStep = {
  "educattach.html": 5,
  "programs.html": 6,
  "form.html": 7,
  "submit.html": 8,
  // add more pages if needed
};

// ====== Get current page ======
const currentPage = window.location.pathname.split("/").pop();

// ====== Load progress safely ======
let savedStep = parseInt(localStorage.getItem("currentStep"));
let currentStep = pageToStep[currentPage] !== undefined ? pageToStep[currentPage] : (savedStep || 5);
let maxUnlockedStep = parseInt(localStorage.getItem("maxUnlockedStep")) || currentStep;

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");

  // ====== Update step UI ======
  function updateSteps() {
    steps.forEach((step, index) => {
      // ACTIVE step (green)
      step.classList.toggle("active", index === currentStep);

      // CLICKABLE or LOCKED
      if (index <= maxUnlockedStep) {
        step.classList.add("clickable");
        step.style.pointerEvents = "auto";
        step.style.opacity = "1";
      } else {
        step.classList.remove("clickable");
        step.style.pointerEvents = "none";
        step.style.opacity = "1";
      }
    });

    // Save progress
    localStorage.setItem("currentStep", currentStep);
    localStorage.setItem("maxUnlockedStep", maxUnlockedStep);
  }

  // ====== Step click navigation ======
  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      if (index > maxUnlockedStep) return; // block locked steps

      currentStep = index;
      updateSteps();

      // Optional: show section if you have this function
      if (typeof showSection === "function") showSection(currentStep);

      // Navigate pages based on step
      switch (index) {
        case 5:
          window.location.href = "educattach.html";
          break;
        case 6:
          window.location.href = "programs.html";
          break;
        case 7:
          window.location.href = "form.html";
          break;
        case 8:
          window.location.href = "submit.html";
          break;
        // Add more steps/pages here
      }
    });
  });

  // ====== Initial render ======
  updateSteps();
});

  // ======= FILE UPLOAD =======
  const uploadedFiles = {};

  window.handleFileUpload = function (fileNumber, fileType) {
    const fileInput = document.getElementById(`file${fileNumber}`);
    const statusElement = document.getElementById(`status${fileNumber}`);
    const file = fileInput.files[0];

    if (file) {
      statusElement.textContent = file.name;

      uploadedFiles[fileNumber] = {
        type: fileType,
        name: file.name,
        size: formatFileSize(file.size),
        number: fileNumber
      };

      updateFileTable();
    }
  };

  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  function updateFileTable() {
    const tbody = document.getElementById("fileTableBody");
    const fileKeys = Object.keys(uploadedFiles).sort((a, b) => a - b);

    if (fileKeys.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5">
            <div class="empty-state">
              <div class="empty-icon">🔍</div>
              <div class="empty-text">No Attached files</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = fileKeys
      .map(key => {
        const file = uploadedFiles[key];
        return `
          <tr class="file-row">
            <td>${file.number}</td>
            <td>${file.type}</td>
            <td>${file.name}</td>
            <td>${file.size}</td>
            <td>
              <div class="status-icons">
                <div class="status-icon success" title="File uploaded successfully">✓</div>
                <div class="status-icon danger" onclick="removeFile(${key})" title="Remove file">×</div>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  window.removeFile = function (fileNumber) {
    const confirmBox = document.getElementById("confirmBox");
    const confirmYes = document.getElementById("confirmYes");
    const confirmNo = document.getElementById("confirmNo");

    confirmBox.style.display = "flex"; // show the box

    // clear previous listeners
    confirmYes.onclick = null;
    confirmNo.onclick = null;

    confirmYes.onclick = () => {
      delete uploadedFiles[fileNumber];
      document.getElementById(`file${fileNumber}`).value = "";
      document.getElementById(`status${fileNumber}`).textContent = "No file chosen";
      updateFileTable();
      confirmBox.style.display = "none";
    };

    confirmNo.onclick = () => {
      confirmBox.style.display = "none";
    };
  };

  // ======= FORM VALIDATION & NOTIFICATION =======
  const nextBtn = document.querySelector(".next-btn");

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const requiredInputs = document.querySelectorAll(".form-input[required]");
    const fileInputs = [
      document.getElementById("file1"),
      document.getElementById("file2"),
      document.getElementById("file3"),
      document.getElementById("file4"),
      document.getElementById("file5")
    ];

    let isValid = true;

    // Remove previous error highlights
    document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

    // Check required inputs
    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add("input-error");
        isValid = false;
      }
    });

    // Check file uploads
    fileInputs.forEach(fileInput => {
      if (!fileInput.files.length) {
        const uploadBox = fileInput.closest(".upload-controls");
        if (uploadBox) uploadBox.classList.add("input-error");
        isValid = false;
      } else {
        const uploadBox = fileInput.closest(".upload-controls");
        if (uploadBox) uploadBox.classList.remove("input-error");
      }
    });

    // Show notification
    if (!isValid) {
      showNotification("⚠️ Please fill out all required fields and upload all attachments!", "error");
    } else {
      showNotification("All required information is complete! Proceeding...", "success");
      // Proceed to next page if needed
       window.location.href = "programs.html";
    }
  });

  // ======= NOTIFICATION FUNCTIONS =======
  window.showNotification = function (message, type = "error") {
    const notification = document.getElementById("notification");
    const text = document.getElementById("notification-text");
    text.textContent = message;

    notification.classList.remove("success");
    notification.classList.remove("error");

    if (type === "success") {
      notification.classList.add("success");
    } else {
      notification.classList.add("error");
    }

    notification.style.display = "block";

    setTimeout(() => {
      hideNotification();
    }, 4000);
  };

  window.hideNotification = function () {
    const notification = document.getElementById("notification");
    notification.style.display = "none";
  };

