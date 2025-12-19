# 📱 CiuCell - Telecommunications Web Platform

![HTML5](https://img.shields.io/badge/HTML-5-E34F26?style=flat&logo=html5)
![CSS3](https://img.shields.io/badge/CSS-3-1572B6?style=flat&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript)
![License](https://img.shields.io/badge/License-Proprietary-red)

A responsive and interactive **Web Application** designed for a modern telecommunications provider. This project simulates a complete e-commerce flow for purchasing SIM card packages, featuring dynamic price calculation, form validation using **Regex**, and engaging **CSS animations**.

## 📸 Preview

<img width="1895" height="897" alt="image" src="https://github.com/user-attachments/assets/23003c64-b5f0-4f08-b3e6-49d95a33ad13" />


*(The platform features a smooth scroll-reveal animation system and a sticky navigation bar)*

## 🌟 Key Features

* **Dynamic Pricing Engine:** A robust JavaScript-based shopping cart that calculates total costs based on selected packages, data add-ons (+5GB, +15GB), and quantities in real-time.
* **Smart Tax & Discount Logic:** Automatically applies a 15% tax or discount depending on the total cart value (threshold: $200).
* **Regex Form Validation:** Secure contact forms that validate user input (Name/Surname must be letters only) and enforce minimum character limits for comments.
* **Interactive UI/UX:** utilizing `IntersectionObserver` logic (scroll listeners) to trigger fade-in and slide-up animations as the user navigates.
* **Responsive Layout:** A flexible grid system using CSS Flexbox that adapts item listings and navigation for different screen sizes.

## 🛠 Technical Implementation

### 1. Dynamic Cost Calculation
The logic iterates through selected items, checks for property modifiers (e.g., Data Packs), and updates the DOM dynamically.

```javascript
function calculateTotal() {
    let items = document.querySelectorAll('input[name="item"]:checked');
    items.forEach(item => {
        let itemProperty = document.querySelector(`input[name="${item.value}-property"]:checked`);
        // ... calculation logic ...
        totalCost += parseFloat(itemProperty.value) * parseInt(itemQuantity);
    });
    // Updates the HTML element instantly
    costParagraph.textContent = `${itemCost.toFixed(2)}`;
}
```
### 2. Advanced CSS Animations
Instead of static visuals, the project uses custom @keyframes for a polished feel.
```javascript
@keyframes slideIn { 
    from { transform: translateY(50px); opacity: 0; } 
    to { transform: translateY(0); opacity: 1; } 
}

.item img {
    animation: slideIn 1s ease-in-out;
    transition: transform 0.3s ease-in-out;
}
```
### 3. Input Validation Security
Client-side validation ensures data integrity before submission.
```javascript
const nameField = document.getElementById('name');
// Regex: Only allows uppercase and lowercase letters
if (name === "" || !/^[A-Za-z]+$/.test(name)) {
    errors.push("Name is required and should only contain letters.");
    nameField.classList.add('error');
}
```
### ⚖️ License & Rights
⚠️ PROPRIETARY LICENSE - ALL RIGHTS RESERVED

This software and its associated documentation are the exclusive property of Berk Elmalı.
No Commercial Use: You may not use this source code for commercial purposes without explicit written permission from the author.
No Modification: You may not modify, distribute, or create derivative works based on this project.
No Distribution: You may not host this code on any public repository or server without authorization.
For permission requests, please contact the author directly.

### 🚀 How to Run
Clone this repository.
Navigate to the project folder.
Open index.html in any modern web browser (Chrome, Firefox, Edge).
### 👨‍💻 Author: Berk Elmalı
Developed as a demonstration of Frontend Web Development, DOM Manipulation, and Interactive UI Design.
