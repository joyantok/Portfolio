// Typed.js initialization
document.addEventListener("DOMContentLoaded", function () {
  var typed = new Typed("#typed", {
    strings: [
      "Web Developer",
      "Frontend Specialist",
      "UI/UX Designer",
      "Full Stack Developer",
    ],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    menuToggle.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Active link highlighting
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });

    // Scroll to top button visibility
    const scrollTopBtn = document.getElementById("scrollTop");
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });

  // Scroll to top functionality
  document.getElementById("scrollTop").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Form submission
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Simulate form submission
      const submitBtn = document.querySelector(".submit-btn");
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

      setTimeout(() => {
        alert("Thank you! Your message has been sent successfully.");
        document.getElementById("contactForm").reset();
        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      }, 1500);
    });

  // Animation on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".exp-card, .skill-category, .service-card, .project-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  document
    .querySelectorAll(
      ".exp-card, .skill-category, .service-card, .project-card"
    )
    .forEach((el) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(50px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

  // Run on load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);
});



//number animation section

document.addEventListener("DOMContentLoaded", function () {
  function getTargetFromText(text) {
    const m = text.replace(/,/g, "").match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  }

  function animateCounter(el, target, duration = 1200) {
    const hasPlus = el.textContent.trim().endsWith("+");
    const format = (v) => Math.floor(v) + (hasPlus ? "+" : "");
    let startTime = null;

    // start from 0 (with + if present)
    el.textContent = hasPlus ? "0+" : "0";

    function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = format(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = format(target);
      }
    }

    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll(".experience-cards .exp-card h3");

  // Start when visible (and only once)
  if ("IntersectionObserver" in window) {
    const seen = new WeakSet();
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          const target = entry.target.dataset.target
            ? parseInt(entry.target.dataset.target, 10)
            : getTargetFromText(entry.target.textContent);
          animateCounter(entry.target, target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach((el) => io.observe(el));
  } else {
    // Fallback: start immediately if IO not supported
    counters.forEach((el) => animateCounter(el, getTargetFromText(el.textContent)));
  }
});

//line incresing

document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll(".skill-progress span");

  progressBars.forEach((bar, index) => {
    // Save original width
    const targetWidth = bar.style.width;
    bar.style.width = "0"; // start from 0
    bar.style.transition = "width 1.5s cubic-bezier(0.65, 0, 0.35, 1)"; // very smooth easing

    // Add a small delay for each bar to animate sequentially
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, index * 150); // 150ms delay between each bar
  });
});