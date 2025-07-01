// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Toggle mobile navigation menu
const hamburgerCheckbox = document.querySelector(".hamburger input[type='checkbox']");
hamburgerCheckbox?.addEventListener("change", (e) => {
  console.log("hamburger clicked! target: ", e.target);
  if (hamburgerCheckbox.checked)
    handleClickout(hamburgerCheckbox);
});

function handleClickout(checkbox) {
  document.addEventListener("click", (e) => {
    const inside = document.querySelector("header");
    const isClickInside = inside.contains(e.target);
    
    if (!isClickInside) {
      checkbox.checked = false; // Uncheck the hamburger menu
      document.removeEventListener("click", handleClickout); // Remove the event listener
    }

  })
}

// Simple animation for section elements when they come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});
