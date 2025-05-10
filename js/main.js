// DOM Elements
const body = document.querySelector("body")
const header = document.querySelector("header")
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll(".section")
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navLinksContainer = document.querySelector(".nav-links")
const fadeElements = document.querySelectorAll(".fade-in")
const cursor = document.querySelector(".cursor")
const cursorFollower = document.querySelector(".cursor-follower")
const contactForm = document.getElementById("contact-form")

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active")
  navLinksContainer.classList.toggle("active")
  body.classList.toggle("no-scroll")
})

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active")
    navLinksContainer.classList.remove("active")
    body.classList.remove("no-scroll")
  })
})

// Sticky Header
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Active Navigation Link on Scroll
window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })
})

// Intersection Observer for Fade-in Animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  },
  { threshold: 0.1 },
)

fadeElements.forEach((element) => {
  observer.observe(element)
})

// Contact Form Submission 
contactForm.addEventListener("submit", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Simple frontend validation before allowing submission
  if (name && email && message) {
    const submitButton = contactForm.querySelector("button[type='submit']");
    const btnText = submitButton.querySelector(".btn-text");
    const btnSpinner = submitButton.querySelector(".btn-spinner");

    // Disable the button and show spinner
    submitButton.disabled = true;
    btnText.style.display = "none";
    btnSpinner.style.display = "inline-block";

    // Let the form submit naturally to Formsubmit
  } else {
    alert("Please fill in all fields.");
  }
});


// Preload images for smoother experience
function preloadImages() {
  const images = [
    "assets/pfp.png"
  ]

  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Add particle animation
function initParticles() {
  const particlesContainer = document.querySelector(".particles-container")

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.width = `${Math.random() * 5 + 1}px`
    particle.style.height = particle.style.width
    particle.style.background = `rgba(0, 229, 255, ${Math.random() * 0.5 + 0.25})`
    particle.style.position = "absolute"
    particle.style.borderRadius = "50%"
    particle.style.top = `${Math.random() * 100}%`
    particle.style.left = `${Math.random() * 100}%`
    particle.style.boxShadow = "0 0 10px rgba(0, 229, 255, 0.8)"

    // Set animation properties
    const duration = Math.random() * 20 + 10
    const delay = Math.random() * 5

    particle.style.animation = `float ${duration}s ${delay}s infinite linear`

    particlesContainer.appendChild(particle)
  }

  // Add keyframes for float animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes float {
      0% {
        transform: translateY(0) translateX(0);
      }
      25% {
        transform: translateY(-100px) translateX(50px);
      }
      50% {
        transform: translateY(-50px) translateX(100px);
      }
      75% {
        transform: translateY(-100px) translateX(50px);
      }
      100% {
        transform: translateY(0) translateX(0);
      }
    }
  `
  document.head.appendChild(style)
}

// Replace the initNeuralNetwork function with this improved version
function initNeuralNetwork() {
  const canvas = document.getElementById("neural-network-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const width = canvas.width
  const height = canvas.height

  // Neural network parameters
  const layers = [5, 8, 10, 6, 3] // Input, hidden layers, output
  const neurons = []
  const connections = []

  // Create neurons
  let xOffset = 40
  const layerSpacing = (width - 80) / (layers.length - 1)

  for (let l = 0; l < layers.length; l++) {
    const layerSize = layers[l]
    const ySpacing = height / (layerSize + 1)

    for (let n = 0; n < layerSize; n++) {
      neurons.push({
        x: xOffset,
        y: (n + 1) * ySpacing,
        layer: l,
        activation: Math.random(), // Random initial activation
        size: 4 + Math.random() * 2, // Random size variation
      })

      // Create connections to previous layer
      if (l > 0) {
        const prevLayerStart = neurons.findIndex((neuron) => neuron.layer === l - 1)
        const prevLayerSize = layers[l - 1]

        for (let p = 0; p < prevLayerSize; p++) {
          connections.push({
            from: prevLayerStart + p,
            to: neurons.length - 1,
            weight: Math.random() * 2 - 1, // Random weight between -1 and 1
            speed: 0.5 + Math.random() * 1.5, // Random signal speed
          })
        }
      }
    }

    xOffset += layerSpacing
  }

  // Signals traveling along connections
  const signals = []

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Update and draw connections
    for (const connection of connections) {
      const from = neurons[connection.from]
      const to = neurons[connection.to]

      // Draw connection line
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)

      // Connection color based on weight
      const alpha = Math.abs(connection.weight) * 0.5 + 0.1
      const color = connection.weight > 0 ? `rgba(0, 229, 255, ${alpha})` : `rgba(255, 100, 100, ${alpha})`

      ctx.strokeStyle = color
      ctx.lineWidth = Math.abs(connection.weight) * 2 + 0.5
      ctx.stroke()

      // Randomly create new signals
      if (Math.random() < 0.01) {
        signals.push({
          connection: connection,
          progress: 0,
          speed: connection.speed / 100,
        })
      }
    }

    // Update and draw signals
    for (let i = signals.length - 1; i >= 0; i--) {
      const signal = signals[i]
      const from = neurons[signal.connection.from]
      const to = neurons[signal.connection.to]

      // Update signal position
      signal.progress += signal.speed

      if (signal.progress >= 1) {
        // Signal reached the end, remove it
        signals.splice(i, 1)

        // Activate the target neuron
        neurons[signal.connection.to].activation = 1
        continue
      }

      // Calculate signal position
      const x = from.x + (to.x - from.x) * signal.progress
      const y = from.y + (to.y - from.y) * signal.progress

      // Draw signal
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fillStyle = signal.connection.weight > 0 ? "#00e5ff" : "#ff6464"
      ctx.fill()

      // Add glow effect
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = signal.connection.weight > 0 ? "rgba(0, 229, 255, 0.3)" : "rgba(255, 100, 100, 0.3)"
      ctx.fill()
    }

    // Draw neurons
    for (const neuron of neurons) {
      // Update neuron activation (decay over time)
      neuron.activation *= 0.95

      // Draw neuron
      ctx.beginPath()
      ctx.arc(neuron.x, neuron.y, neuron.size, 0, Math.PI * 2)

      // Neuron color based on activation
      const brightness = Math.floor(neuron.activation * 255)
      ctx.fillStyle = `rgb(${brightness}, ${brightness + 100}, 255)`
      ctx.fill()

      // Glow effect based on activation
      if (neuron.activation > 0.1) {
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.size + 5 * neuron.activation, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 229, 255, ${neuron.activation * 0.5})`
        ctx.fill()
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
}


// Add a glitch effect to the hero title
function addGlitchEffect() {
  const heroTitle = document.querySelector(".hero-content h1")
  if (heroTitle) {
    setInterval(() => {
      heroTitle.style.textShadow = `
        ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(0, 229, 255, 0.8),
        ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(100, 255, 218, 0.8)
      `

      setTimeout(() => {
        heroTitle.style.textShadow = "0 0 10px rgba(0, 229, 255, 0.5)"
      }, 100)
    }, 3000)
  }
}

// Add this function to create a data visualization effect
function createDataVisualization() {
  const canvas = document.createElement("canvas")
  canvas.id = "data-visualization"
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "-1"
  canvas.style.opacity = "0.15"

  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")

  // Data points
  const dataPoints = []
  const numPoints = 100

  for (let i = 0; i < numPoints; i++) {
    dataPoints.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      connections: [],
    })
  }

  // Find connections between nearby points
  for (let i = 0; i < numPoints; i++) {
    for (let j = i + 1; j < numPoints; j++) {
      const dx = dataPoints[i].x - dataPoints[j].x
      const dy = dataPoints[i].y - dataPoints[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        dataPoints[i].connections.push(j)
        dataPoints[j].connections.push(i)
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw connections
    for (let i = 0; i < numPoints; i++) {
      const point = dataPoints[i]

      // Draw connections
      for (const connIndex of point.connections) {
        const connPoint = dataPoints[connIndex]

        const dx = point.x - connPoint.x
        const dy = point.y - connPoint.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(connPoint.x, connPoint.y)

          const alpha = ((150 - distance) / 150) * 0.2
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Update position
      point.x += point.speedX
      point.y += point.speedY

      // Bounce off edges
      if (point.x < 0 || point.x > canvas.width) point.speedX *= -1
      if (point.y < 0 || point.y > canvas.height) point.speedY *= -1

      // Draw point
      ctx.beginPath()
      ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
      ctx.fillStyle = "#00e5ff"
      ctx.fill()
    }

    requestAnimationFrame(animate)
  }

  animate()

  // Resize canvas when window is resized
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Add a new function for the hero neural network background
function initHeroNeuralNetwork() {
  const canvas = document.getElementById("hero-neural-network")
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const ctx = canvas.getContext("2d")
  const width = canvas.width
  const height = canvas.height

  // Particles
  const particles = []
  const particleCount = 150 // Increased particle count
  const connectionDistance = 200 // Increased connection distance

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1.5, // Larger particles
      speedX: (Math.random() - 0.5) * 0.7, // Slightly faster
      speedY: (Math.random() - 0.5) * 0.7,
    })
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Update and draw particles
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i]

      // Update position
      p.x += p.speedX
      p.y += p.speedY

      // Boundary check
      if (p.x < 0 || p.x > width) p.speedX *= -1
      if (p.y < 0 || p.y > height) p.speedY *= -1

      // Draw particle
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 229, 255, 0.8)" // More visible
      ctx.fill()

      // Draw connections
      for (let j = i + 1; j < particleCount; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          const opacity = 1 - distance / connectionDistance
          ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.5})` // More visible connections
          ctx.lineWidth = 1.5 // Thicker lines
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  animate()

  // Resize canvas when window is resized
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  preloadImages()
  initParticles()
  initNeuralNetwork()
  initHeroNeuralNetwork() // Add the new neural network for hero background
  createDataVisualization()

  // Add a small delay before adding the visible class to hero elements
  setTimeout(() => {
    document.querySelectorAll("#hero .fade-in").forEach((el) => {
      el.classList.add("visible")
    })
  }, 300)
})

// Add CSS for the particles
const particleStyles = document.createElement("style")
particleStyles.textContent = `
  .particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
  
  .neural-network-visualization {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`
document.head.appendChild(particleStyles)

// Add CSS for the hero neural network
const heroNetworkStyles = document.createElement("style")
heroNetworkStyles.textContent = `
  #hero-neural-network {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.8;
  }
`
document.head.appendChild(heroNetworkStyles)


// Certificate Slider Functionality
function initCertificateSlider() {
  const slides = document.querySelectorAll(".certificate-slide")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const currentCertificate = document.querySelector(".current-certificate")
  const totalCertificates = document.querySelector(".total-certificates")

  let currentIndex = 0

  // Set total certificates count
  if (totalCertificates) {
    totalCertificates.textContent = slides.length
  }

  // Create modal for enlarged view
  const modal = document.createElement("div")
  modal.className = "certificate-modal"
  modal.innerHTML = `
    <div class="certificate-modal-content">
      <img src="/placeholder.svg" alt="Certificate">
      <button class="certificate-modal-close">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  `
  document.body.appendChild(modal)

  const modalImg = modal.querySelector("img")
  const closeBtn = modal.querySelector(".certificate-modal-close")

  // Add click event to certificate images
  slides.forEach((slide) => {
    const img = slide.querySelector("img")
    if (img) {
      img.addEventListener("click", () => {
        modalImg.src = img.src
        modal.classList.add("active")
      })
    }
  })

  // Close modal on button click
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active")
  })

  // Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })

  // Navigation functions
  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    slides[index].classList.add("active")

    if (currentCertificate) {
      currentCertificate.textContent = index + 1
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length
    showSlide(currentIndex)
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length
    showSlide(currentIndex)
  }

  // Add event listeners to buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide)
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide)
  }

  // Initialize first slide
  showSlide(currentIndex)

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide()
    } else if (e.key === "ArrowLeft") {
      prevSlide()
    } else if (e.key === "Escape") {
      modal.classList.remove("active")
    }
  })
}

// Initialize certificate slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Declare the variables
  let preloadImages
  let initParticles
  let initNeuralNetwork
  let initHeroNeuralNetwork
  let initTypingAnimation
  let enhanceCursorEffects
  let createDataVisualization

  // Existing initializations...
  preloadImages = () => {
    console.log("preloadImages function called")
  } // Placeholder
  initParticles = () => {
    console.log("initParticles function called")
  } // Placeholder
  initNeuralNetwork = () => {
    console.log("initNeuralNetwork function called")
  } // Placeholder
  initHeroNeuralNetwork = () => {
    console.log("initHeroNeuralNetwork function called")
  } // Placeholder
  initTypingAnimation = () => {
    console.log("initTypingAnimation function called")
  } // Placeholder
  enhanceCursorEffects = () => {
    console.log("enhanceCursorEffects function called")
  } // Placeholder
  createDataVisualization = () => {
    console.log("createDataVisualization function called")
  } // Placeholder

  preloadImages()
  initParticles()
  initNeuralNetwork()
  initHeroNeuralNetwork()
  initTypingAnimation()
  enhanceCursorEffects()
  createDataVisualization()

  // Add the new initialization
  initCertificateSlider()

  // Add a small delay before adding the visible class to hero elements
  setTimeout(() => {
    document.querySelectorAll("#hero .fade-in").forEach((el) => {
      el.classList.add("visible")
    })
  }, 300)

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-slide').forEach(el => {
      el.classList.add('visible');
    });
  });

  window.addEventListener('DOMContentLoaded', () => {
    // Run fade-slide logic for all devices
    document.querySelectorAll('.fade-slide').forEach(el => {
      el.classList.add('visible');
    });

    // Only run network animation on Android devices
  const isandroid = /Android/i.test(navigator.userAgent);
    if (!isandroid) return;

    const heroCanvas = document.getElementById("hero-neural-network");
    if (!heroCanvas) return;

    const ctx = heroCanvas.getContext("2d");

    function resizeCanvas() {
      heroCanvas.width = window.innerWidth;
      heroCanvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const width = heroCanvas.width;
    const height = heroCanvas.height;

    // ⚠️ Aggressively reduce node density and complexity
    

const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

let nodeCount, connectionDistance, nodeRadius, nodeSpeed, opacity;

if (isAndroid) {
  nodeCount = 5;
  connectionDistance = 65;
  nodeRadius = 1.0;
  nodeSpeed = 0.08;
  opacity = 0.08;
} else if (isIOS) {
  nodeCount = 40;
  connectionDistance = 90;
  nodeRadius = 1.5;
  nodeSpeed = 0.15;
  opacity = 0.15;
} else {
  nodeCount = 50;
  connectionDistance = 100;
  nodeRadius = 1.5;
  nodeSpeed = 0.15;
  opacity = 0.15;
}

    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * nodeSpeed,
        vy: (Math.random() - 0.5) * nodeSpeed
      });
    }

    function animate() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= heroCanvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= heroCanvas.height) node.vy *= -1;
      });

      ctx.lineWidth = 0.3;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * opacity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = "rgba(0, 229, 255, 0.5)";
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
        ctx.fill();
      });

      // 20 FPS for Android
      setTimeout(() => requestAnimationFrame(animate), 1000 / 20);
    }

    animate();
  });

});