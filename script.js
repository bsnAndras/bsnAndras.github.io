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
  if (hamburgerCheckbox.checked)
    handleClickout(hamburgerCheckbox);
});

function handleClickout(checkbox) {
  document.addEventListener("click", (e) => {
    const unresponsiveArea = document.querySelector("header");
    const isLink = e.target.tagName === "A";
    const shouldClose = !unresponsiveArea.contains(e.target) || isLink;
    
    if (shouldClose) {
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
