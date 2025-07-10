// ✅ Hardcoded listings
const listings = [
  {
    id: 1,
    city: "Mumbai",
    type: "2BHK",
    title: "2BHK in Mumbai",
    location: "Andheri West",
    price: 15000,
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
  },
  {
    id: 2,
    city: "Bangalore",
    type: "1RK",
    title: "1RK in Bangalore",
    location: "Indiranagar",
    price: 8000,
    image: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg"
  },
  {
    id: 3,
    city: "Delhi",
    type: "Studio",
    title: "Studio Flat in Delhi",
    location: "Saket",
    price: 12000,
    image: "https://images.pexels.com/photos/8141959/pexels-photo-8141959.jpeg"
  }
];

const container = document.getElementById("listingsContainer");
const citySel = document.getElementById("filterCity");
const typeSel = document.getElementById("filterType");
const minInput = document.getElementById("filterMin");
const maxInput = document.getElementById("filterMax");

// ✅ Reusable function to render listings
function renderListings(items) {
  container.innerHTML = "";

  const modal = document.getElementById("detailsModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalLocation = document.getElementById("modalLocation");
  const modalPrice = document.getElementById("modalPrice");
  const modalDescription = document.getElementById("modalDescription");
  const modalContact = document.getElementById("modalContact");
  const closeBtn = document.querySelector(".modal .close");

  items.forEach(l => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${l.image}" alt="${l.title}">
      <div class="card-content">
        <h3>${l.title}</h3>
        <p>${l.location}, ${l.city}</p>
        <p class="price">₹${l.price}/month</p>
        <button class="details-btn">View Details</button>
      </div>`;

    card.querySelector(".details-btn").addEventListener("click", () => {
      modalTitle.textContent = l.title;
      modalLocation.textContent = `${l.location}, ${l.city}`;
      modalPrice.textContent = `₹${l.price}/month`;
      modalDescription.textContent = `Description: ${l.description || "N/A"}`;
      modalContact.textContent = `Contact: ${l.contact || "N/A"}`;
      modal.classList.remove("hidden");
    });

    container.appendChild(card);
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}

// ✅ Filter function (local filtering)
function applyFilters() {
  const city = citySel.value;
  const type = typeSel.value;
  const min = parseInt(minInput.value) || 0;
  const max = parseInt(maxInput.value) || Infinity;

  const filtered = listings.filter(l =>
    (!city || l.city === city) &&
    (!type || l.type === type) &&
    l.price >= min && l.price <= max
  );

  renderListings(filtered);
}

function clearFilters() {
  citySel.value = "";
  typeSel.value = "";
  minInput.value = "";
  maxInput.value = "";
  renderListings(listings);
}

// ✅ Local user setup
const updatedContact = "0123456789";
const storedUsers = JSON.parse(localStorage.getItem("users"));
if (!storedUsers || storedUsers[0].contact !== updatedContact) {
  const users = [{ contact: updatedContact, password: "admin123" }];
  localStorage.setItem("users", JSON.stringify(users));
}

// ✅ Login & Auth
function handleLogin() {
  const contact = document.getElementById("contactInfo").value.trim();
  const password = document.getElementById("password").value.trim();
  const errBox = document.getElementById("loginError");

  if (!contact || !password) {
    errBox.textContent = "All fields are required!";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const matchedUser = users.find(u => u.contact === contact && u.password === password);

  if (matchedUser) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("appSection").style.display = "block";
    renderListings(listings);
  } else {
    errBox.textContent = "Invalid credentials!";
  }
}

function handleForgotPassword() {
  const contact = document.getElementById("contactInfo").value.trim();
  const errBox = document.getElementById("loginError");

  if (!contact) {
    errBox.textContent = "Please enter your phone number or email.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const matchedUser = users.find(u => u.contact === contact);

  if (!matchedUser) {
    errBox.textContent = "User not found!";
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("resetOTP", otp);
  localStorage.setItem("resetUser", contact);
  alert(`OTP sent to ${contact}: ${otp}`);

  const userOtp = prompt("Enter the OTP you received:");
  if (userOtp == otp) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("resetSection").style.display = "block";
  } else {
    alert("Incorrect OTP.");
  }
}

function resetPassword() {
  const newPass = document.getElementById("newPassword").value.trim();
  const confirmPass = document.getElementById("confirmPassword").value.trim();
  const errBox = document.getElementById("resetError");

  if (!newPass || !confirmPass) {
    errBox.textContent = "Both fields are required!";
    return;
  }

  if (newPass !== confirmPass) {
    errBox.textContent = "Passwords do not match!";
    return;
  }

  const contact = localStorage.getItem("resetUser");
  let users = JSON.parse(localStorage.getItem("users")) || [];

  users = users.map(u =>
    u.contact === contact ? { ...u, password: newPass } : u
  );

  localStorage.setItem("users", JSON.stringify(users));
  alert("Password has been reset successfully!");

  document.getElementById("resetSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
}

function togglePassword(inputId, iconElement) {
  const input = document.getElementById(inputId);
  input.type = input.type === "password" ? "text" : "password";
  iconElement.textContent = input.type === "password" ? "👁️" : "🙈";
}

function handleLogout() {
  document.getElementById("appSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("loginError").textContent = "";
}

// ✅ Initial state (local)
renderListings(listings);
