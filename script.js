// Navigation and Scroll Handling
document.addEventListener("DOMContentLoaded", () => {
  // Get all navigation items
  const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item")
  const sections = document.querySelectorAll("section")

  // Smooth scroll to section
  window.scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle navigation clicks
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const sectionId = this.getAttribute("data-section")
      window.scrollToSection(sectionId)
    })
  })

  // Update active navigation item on scroll
  function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all nav items
        navItems.forEach((nav) => {
          nav.classList.remove("active")
        })

        // Add active class to current section nav items
        const activeNavItems = document.querySelectorAll('[data-section="' + sectionId + '"]')
        activeNavItems.forEach((nav) => {
          nav.classList.add("active")
        })
      }
    })
  }

  // Throttle scroll events for better performance
  let ticking = false
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNavigation()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", handleScroll)

  // Animate skill bars when they come into view
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBar = entry.target
            const width = skillBar.getAttribute("data-width")
            skillBar.style.width = width + "%"
          }
        })
      },
      {
        threshold: 0.5,
      },
    )

    skillBars.forEach((bar) => {
      observer.observe(bar)
    })
  }

  // Initialize skill bar animations
  animateSkillBars()

  // Add fade-in animation to sections
  function addFadeInAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up")
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    // Observe all major content elements
    const elementsToAnimate = document.querySelectorAll(
      ".hero-text, .hero-image, .about-text, .education-section, " +
        ".timeline-item, .project-card, .design-card, .skill-item, .contact-card",
    )

    elementsToAnimate.forEach((el) => {
      observer.observe(el)
    })
  }

  // Initialize fade-in animations
  addFadeInAnimations()

  // Initialize Typed.js for typing animation
  function initializeTypingAnimation() {
    // Check if Typed is available
    if (typeof Typed !== "undefined") {
      var typed = new Typed(".typing", {
        strings: [
          "",
          "Web Developer",
          "Frontend Developer",
          "NextJs Developer",
          "Full Stack Developer",
          "MERN Stack Developer",
        ],
        typeSpeed: 100,
        backSpeed: 80,
        loop: true,
      })
    } else {
      console.log("Typed.js library not loaded")
    }
  }

  // Initialize typing animation after a short delay to ensure Typed.js is loaded
  setTimeout(initializeTypingAnimation, 100)

  // Initialize page
  updateActiveNavigation()

  // Add loading class removal after page load
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })

  // Handle resize events
  window.addEventListener("resize", () => {
    // Recalculate positions if needed
    updateActiveNavigation()
  })

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // Handle keyboard shortcuts if needed
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "1":
          e.preventDefault()
          window.scrollToSection("home")
          break
        case "2":
          e.preventDefault()
          window.scrollToSection("about")
          break
        case "3":
          e.preventDefault()
          window.scrollToSection("experience")
          break
        case "4":
          e.preventDefault()
          window.scrollToSection("projects")
          break
        case "5":
          e.preventDefault()
          window.scrollToSection("skills")
          break
        case "6":
          e.preventDefault()
          window.scrollToSection("contact")
          break
      }
    }
  })
})

// Lightbox functionality
window.openLightbox = (imageSrc, caption) => {
  const lightbox = document.getElementById("lightbox")
  const lightboxImage = document.getElementById("lightbox-image")
  const lightboxCaption = document.getElementById("lightbox-caption")

  lightboxImage.src = imageSrc
  lightboxCaption.textContent = caption
  lightbox.style.display = "block"
  document.body.style.overflow = "hidden"
}

window.closeLightbox = () => {
  const lightbox = document.getElementById("lightbox")
  lightbox.style.display = "none"
  document.body.style.overflow = "auto"
}

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.closeLightbox()
  }
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction() {
    const args = arguments
    const later = function () {
      clearTimeout(timeout)
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
