const navbar = document.querySelector("nav");
const sidebar = document.querySelector(".sidebar");
const menu = document.querySelector(".menu");
const cross = document.querySelector(".cross");

menu.addEventListener("click", () => {
  navbar.style.display = "none";
  sidebar.style.display = "flex";
});

cross.addEventListener("click", () => {
  navbar.style.display = "flex";
  sidebar.style.display = "none";
});
