document.addEventListener("DOMContentLoaded", function () {
  // Initialize copy button functionality
  const copyButton = document.getElementById("copy-button");
  const contractAddress = document.getElementById("contract-address");

  if (copyButton && contractAddress) {
    copyButton.addEventListener("click", function () {
      navigator.clipboard
        .writeText(contractAddress.textContent)
        .then(() => {
          // Visual feedback for successful copy
          copyButton.innerHTML = '<i class="fas fa-check"></i>';

          // Create a fun popping animation
          const tooltip = document.createElement("div");
          tooltip.className = "copy-pop";
          tooltip.innerHTML = 'Copied! <span class="emoji">👍</span>';
          document.body.appendChild(tooltip);

          // Position near the button
          const buttonRect = copyButton.getBoundingClientRect();
          tooltip.style.top = buttonRect.top - 40 + "px";
          tooltip.style.left = buttonRect.left - 20 + "px";

          // Animate and remove
          setTimeout(() => {
            tooltip.style.transform = "translateY(-20px)";
            tooltip.style.opacity = "0";
            setTimeout(() => {
              document.body.removeChild(tooltip);
              copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            }, 500);
          }, 1500);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = 80; // Match the header height from CSS
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Add a little bounce animation to the target section
        targetElement.classList.add("section-bounce");
        setTimeout(() => {
          targetElement.classList.remove("section-bounce");
        }, 1000);
      }
    });
  });

  // Add scroll reveal animations
  const revealElements = document.querySelectorAll(
    ".about-cards .card, .token-stats .stat-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
    // Add initial hidden state via inline style
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Listener to apply the revealed class
  document.addEventListener("scroll", function () {
    document.querySelectorAll(".revealed").forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });
  });

  // Trigger initial scroll event to reveal elements already in view
  setTimeout(() => {
    window.dispatchEvent(new Event("scroll"));
  }, 300);

  // Add random confetti effect
  setInterval(createRandomConfetti, 2000);

  // Create speech bubble dynamic text
  const speechBubble = document.querySelector(".speech-bubble");
  if (speechBubble) {
    const phrases = [
      "WOW!",
      "COOL!",
      "AMAZING!",
      "TO THE MOON!",
      "YAKIU!",
      "SUCH MEME!",
    ];
    setInterval(() => {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      speechBubble.innerHTML = randomPhrase;
      speechBubble.classList.add("phrase-change");
      setTimeout(() => {
        speechBubble.classList.remove("phrase-change");
      }, 500);
    }, 5000);
  }

  // Add CSS for the new animations
  const style = document.createElement("style");
  style.textContent = `
    .copy-pop {
      position: fixed;
      background: var(--primary-color);
      color: var(--text-dark);
      padding: 8px 12px;
      border-radius: 20px;
      font-weight: bold;
      z-index: 1000;
      transition: transform 0.5s ease, opacity 0.5s ease;
      border: 2px solid var(--text-dark);
    }
    
    .section-bounce {
      animation: section-bounce 1s ease;
    }
    
    @keyframes section-bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    .phrase-change {
      animation: phrase-pop 0.5s ease;
    }
    
    @keyframes phrase-pop {
      0% {
        transform: scale(0.8) rotate(10deg);
      }
      50% {
        transform: scale(1.2) rotate(5deg);
      }
      100% {
        transform: scale(1) rotate(10deg);
      }
    }
  `;
  document.head.appendChild(style);
});

// Function to create random confetti elements
function createRandomConfetti() {
  const confettiColors = ["#ffd100", "#ff6b6b", "#4fe3b8", "#5eecff"];
  const confetti = document.createElement("div");
  confetti.className = "random-confetti";

  // Random position, size, and color
  const size = Math.floor(Math.random() * 15) + 5;
  const color =
    confettiColors[Math.floor(Math.random() * confettiColors.length)];
  const left = Math.floor(Math.random() * window.innerWidth);

  confetti.style.width = size + "px";
  confetti.style.height = size + "px";
  confetti.style.background = color;
  confetti.style.left = left + "px";
  confetti.style.top = "-20px";
  confetti.style.position = "fixed";
  confetti.style.zIndex = "-1";
  confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
  confetti.style.opacity = "0.8";

  // Random rotation
  const rotation = Math.floor(Math.random() * 360);
  confetti.style.transform = `rotate(${rotation}deg)`;

  // Set animation
  const duration = Math.floor(Math.random() * 5) + 3;
  confetti.style.transition = `top ${duration}s linear, transform ${duration}s linear, opacity ${duration}s linear`;

  document.body.appendChild(confetti);

  // Start animation after a small delay
  setTimeout(() => {
    confetti.style.top = window.innerHeight + "px";
    confetti.style.transform = `rotate(${rotation + 360}deg)`;
    confetti.style.opacity = "0";
  }, 10);

  // Remove element after animation
  setTimeout(() => {
    document.body.removeChild(confetti);
  }, duration * 1000 + 100);
}
