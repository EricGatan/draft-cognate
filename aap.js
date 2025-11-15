// =====================================================
// GRADE CARD DOWNLOAD ALERT
// =====================================================
document.querySelectorAll('.grade-card').forEach(card => {
  card.addEventListener('click', () => {
    alert('Downloading form...');
  });
});

// =====================================================
// EXTRA FIELD TOGGLING
// =====================================================
document.getElementById('transferred-yes').addEventListener('change', () => {
    document.getElementById('transfer-fields').classList.remove('hidden');
});

document.getElementById('transferred-no').addEventListener('change', () => {
    document.getElementById('transfer-fields').classList.add('hidden');
    document.getElementById('transferredFrom').value = '';
    document.getElementById('transferredYear').value = '';
});

document.getElementById('bsu-yes').addEventListener('change', () => {
    document.getElementById('bsu-field').classList.remove('hidden');
});

document.getElementById('bsu-no').addEventListener('change', () => {
    document.getElementById('bsu-field').classList.add('hidden');
});

// =====================================================
// CLEAR ERRORS WHEN USER TYPES OR CHANGES
// =====================================================
document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => {
        el.classList.remove('error');
        const q = el.closest('.question');
        if (q) q.classList.remove('error');
        const notif = document.getElementById('error-notif');
        notif.style.display = 'none';
    });
});

// =====================================================
// SHOW NOTIFICATION FUNCTION
// =====================================================
function showNotification(message) {
    const notif = document.getElementById('error-notif');
    notif.textContent = message;
    notif.style.display = 'block';
    
    // Force a short delay to ensure opacity transition works
    setTimeout(() => {
        notif.style.opacity = 1; // fade in
    }, 50);

    // Keep notification visible for 6 seconds
    setTimeout(() => {
        notif.style.opacity = 0; // start fade out
        // Completely hide after fade-out
        setTimeout(() => {
            notif.style.display = 'none';
        }, 1000); // match CSS transition duration
    }, 6000); // visible for 6 seconds
}

// =====================================================
// HANDLE NEXT BUTTON
// =====================================================
function handleNext() {
    let error = false;

    const aap = document.querySelector('input[name="aap"]:checked');

    // Reset previous errors
    document.querySelectorAll('.aap-option input').forEach(input => input.classList.remove('error'));

    if (!aap) {
        // Highlight all radio buttons (optional)
        document.querySelectorAll('input[name="aap"]').forEach(input => input.classList.add('error'));
        error = true;
    }

    if (error) {
        showNotification("Please complete all required fields before proceeding.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return; // STOP here, do not redirect
    }

    // SUCCESS → go to next page
    window.location.href = "personal.html";
}
