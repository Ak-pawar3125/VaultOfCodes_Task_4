const password = document.getElementById("pass");
const confirmPass = document.getElementById("pass1");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const submitBtn = document.getElementById("submit");
const profilePic = document.getElementById("profile-pic");
const preview = document.getElementById("preview");

// -------- Password Strength Check -------- //
password.addEventListener("input", () => {
  const val = password.value;
  let strength = 0;

  if (val.length >= 6) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[@$!%*?&#]/.test(val)) strength++;

  if (val.length === 0) {
    strengthBar.className = "strength";
    strengthText.textContent = "Strength: N/A";
    strengthText.style.color = "#000";
  } else if (strength <= 1) {
    strengthBar.className = "strength weak";
    strengthText.textContent = "Strength: Weak";
    strengthText.style.color = "red";
  } else if (strength == 2 || strength == 3) {
    strengthBar.className = "strength medium";
    strengthText.textContent = "Strength: Medium";
    strengthText.style.color = "orange";
  } else {
    strengthBar.className = "strength strong";
    strengthText.textContent = "Strength: Strong";
    strengthText.style.color = "green";
  }
});

// -------- Password Match Check -------- //
confirmPass.addEventListener("input", () => {
  const existingMsg = document.getElementById("pass-error");
  if (existingMsg) existingMsg.remove();

  if (password.value !== confirmPass.value) {
    confirmPass.style.borderColor = "red";
    const p = document.createElement("p");
    p.id = "pass-error";
    p.textContent = "Passwords do not match!";
    p.style.color = "red";
    confirmPass.after(p);
  } else {
    confirmPass.style.borderColor = "green";
  }
});

// -------- Final Submit Validation -------- //
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const val = password.value;
  let strength = 0;
  if (val.length >= 6) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[@$!%*?&#]/.test(val)) strength++;

  const passwordsMatch = password.value === confirmPass.value;
  const profileSelected = profilePic.files.length > 0;

  const allInputs = document.querySelectorAll("form input, form select");
  let allFilled = true;
  allInputs.forEach((input) => {
    if (
      (input.type !== "checkbox" &&
        input.type !== "file" &&
        input.value.trim() === "") ||
      (input.type === "file" && input.files.length === 0)
    ) {
      allFilled = false;
    }
  });

  if (!allFilled) {
    alert("Please fill in all the required fields.");
    return;
  }

  if (!profileSelected) {
    alert("Please upload a profile picture.");
    return;
  }

  if (strength < 3) {
    alert("Password is too weak. Please create a stronger password.");
    return;
  }

  if (!passwordsMatch) {
    alert("Passwords do not match.");
    return;
  }

  alert("Form submitted successfully!");

  document.querySelector("form").reset();

  strengthBar.className = "strength";
  strengthText.textContent = "Strength: N/A";
  strengthText.style.color = "#000";

  confirmPass.style.borderColor = "#f05e91";
  const existingMsg = document.getElementById("pass-error");
  if (existingMsg) existingMsg.remove();

  if (preview) {
    preview.src = "";
  }
});
