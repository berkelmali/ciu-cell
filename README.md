# 📱 CIU-Cell - Premium Telecommunications Web Platform

![HTML5](https://img.shields.io/badge/HTML-5-E34F26?style=flat&logo=html5)
![CSS3](https://img.shields.io/badge/CSS-3-1572B6?style=flat&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript)
![License](https://img.shields.io/badge/License-Proprietary-red)

A highly responsive, interactive, and visually stunning **Web Application** designed for a premium telecommunications provider. This project features a complete e-commerce flow for purchasing SIM card packages, upgraded with high-fidelity React-like micro-interactions, dynamic light/dark theme sliding toggles, simulated latency loading, and real-time reactive calculations.

## 📸 Preview

<img width="1895" height="897" alt="image" src="https://github.com/user-attachments/assets/23003c64-b5f0-4f08-b3e6-49d95a33ad13" />

*(The platform features a premium glassmorphic UI, a scroll-reveal animation system, and an interactive dual-theme switch)*

---

## 🌟 Key Features

*   **🎚️ Hardware-Style Theme Switch Slider:** A custom, sliding theme toggle switch with animated Sun (☀️) and Moon (🌙) rotations. The selected theme (Light/Dark) persists across all pages using `localStorage`.
*   **🛒 Synced Dynamic Cart Badge:** A responsive, e-commerce-style shopping cart badge on the navigation bar that dynamically tallies items and reacts to cart updates with a springy bounce (`.bump` scaling) effect.
*   **⚡ Real-Time Dynamic Pricing Engine:** A fully reactive JS-based shopping cart that calculates individual item costs, 15% taxes or discounts (automatically thresholding at $200), and final totals instantly upon any user inputs.
*   **🌀 Rotating RGB Conic Border Gradient:** SIM card packaging items feature a high-tech rotating RGB border neon glow that animates smoothly upon hover gestures.
*   **💥 Ripple-Click Interactions:** Primary CTA buttons scale elastically (`transform: scale(0.96)`) and emit expanding cursor-relative radial waves (`.ripple-effect`) upon click events.
*   **✨ Shimmering Skeleton Loaders:** Simulates real-world API network latency with moving shimmer animations when rendering plan detail modal screens.
*   **🎉 Gravity Particle Confetti Rain:** Form submission successes and completed mock transactions trigger a full client-side particle simulation that rains confetti down the viewport with rotation, gravity, and drag coefficients.
*   **📝 Enhanced Form Validation:** Dynamic real-time form validation indicators that highlight inputs as you type and render successful state animations.
*   **📚 Support Infrastructure:** Beautifully matching, fully responsive Privacy Policy (`privacy.html`) and Terms of Service (`terms.html`) document cards.

---

## 🛠️ Technical Implementation Highlights

### 1. High-Fidelity Confetti Physics Engine
Using vanilla JS to render multi-colored particles moving along vectors, utilizing real-time requestAnimationFrame loops.
```javascript
function triggerConfetti() {
    const colors = ["#ff007f", "#ff5e00", "#ffbd59", "#00ffcc", "#0072ff"];
    for (let i = 0; i < 90; i++) {
        // ... particle creation ...
        let yVelocity = Math.random() * 4 + 2; 
        function step() {
            yVelocity += 0.08; // Gravity simulation pull
            // ... vector translation ...
            requestAnimationFrame(step);
        }
    }
}
```

### 2. Micro-Interaction Cursor Ripples
Translating relative cursor offsets directly onto dynamically injected CSS keyframe elements inside click targets.
```javascript
document.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    // ... positioning calculations relative to bounding rectangle ...
    button.appendChild(ripple);
});
```

### 3. Rotating RGB Borders & Glassmorphism Variables
Custom CSS custom properties managing themes and linear backgrounds under variables.
```css
[data-theme="dark"] {
  --bg-primary: #0b0f19;
  --bg-secondary: #111827;
  --primary: #00c6ff;
  --text-primary: #f8fafc;
}

.item::after {
  content: '';
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  border-radius: 26px;
  background: linear-gradient(45deg, var(--primary), var(--accent), var(--accent-secondary), var(--primary));
  background-size: 400% 400%;
  animation: glowRotate 3s linear infinite;
}
```

---

## 🚀 How to Run

1. Clone this repository.
2. Navigate to the project folder.
3. Open `index.html` in any modern web browser.
4. Try selecting plans, toggling dark mode, viewing details modals, or completing a checkout to see all effects in action!

---

### ⚖️ License & Rights
⚠️ **PROPRIETARY LICENSE - ALL RIGHTS RESERVED**

This software and its associated documentation are the exclusive property of Berk Elmalı.
*   **No Commercial Use:** You may not use this source code for commercial purposes without explicit written permission from the author.
*   **No Modification:** You may not modify, distribute, or create derivative works based on this project.
*   **No Distribution:** You may not host this code on any public repository or server without authorization.

For permission requests, please contact the author directly.

---

### 👨‍💻 Author: Berk Elmalı
*Developed as a demonstration of high-fidelity frontend engineering, dynamic DOM manipulation, and interactive web layout animations.*
