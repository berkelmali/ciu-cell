/* ==========================================================================
   CIU-CELL DYNAMIC LOGIC SYSTEM
   Includes React-like High-Fidelity Micro-interactions:
   - Dynamic Theme Slide-Switch Slider
   - Global Active State Button Cursor Ripples
   - Multi-Page Synced Interactive Cart Badges
   - Mock API Latency Shivering Skeleton Loaders
   - Simulated Gravity Particle Confetti Rain
   - Reactive Calculations and Forms
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. SLIDING HARDWARE THEME TOGGLE SWITCH ---
    const themeToggleSwitch = document.getElementById("theme-toggle-switch");
    const switchIcon = document.getElementById("switch-icon");
    
    // Read stored theme preference or default to light
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeSwitchUI(currentTheme);

    if (themeToggleSwitch) {
        themeToggleSwitch.addEventListener("click", () => {
            const activeTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = activeTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeSwitchUI(newTheme);
        });
    }

    function updateThemeSwitchUI(theme) {
        if (!switchIcon) return;
        switchIcon.textContent = theme === "dark" ? "🌙" : "☀️";
    }

    // --- 2. MULTI-PAGE CART BADGE INITIALIZATION ---
    updateCartBadge();

    // --- 3. SCROLL REVEAL ANIMATIONS ---
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    function checkScroll() {
        scrollElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 30) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();

    // --- 4. FAQ ACCORDION HANDLERS ---
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            
            const isActive = item.classList.contains("active");
            
            document.querySelectorAll(".faq-item").forEach(otherItem => {
                otherItem.classList.remove("active");
                otherItem.querySelector(".faq-answer").style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- 5. PRE-SELECT BUNDLE ROUTING SYSTEM ---
    const shoppingForm = document.getElementById("shopping-form");
    if (shoppingForm) {
        const planToBuy = sessionStorage.getItem("buyPlan");
        if (planToBuy) {
            const mapping = {
                'student': 'book1',
                'teacher': 'book2',
                'mega': 'book3',
                'ciuspecial': 'book4'
            };
            const itemCode = mapping[planToBuy];
            if (itemCode) {
                const checkbox = document.querySelector(`input[name="item"][value="${itemCode}"]`);
                const radioBasic = document.querySelector(`input[name="${itemCode}-property"][value]`);
                const selectQty = document.querySelector(`select[name="${itemCode}-quantity"]`);

                if (checkbox) checkbox.checked = true;
                if (radioBasic) radioBasic.checked = true;
                if (selectQty) selectQty.value = "1";
            }
            sessionStorage.removeItem("buyPlan");
        }

        // Run reactive cart builder
        calculateTotalSilent();

        // Bind event listeners to ALL cart inputs to make it FULLY reactive
        const cartInputs = shoppingForm.querySelectorAll("input[type='checkbox'], input[type='radio'], select");
        cartInputs.forEach(input => {
            input.addEventListener("change", () => {
                calculateTotalSilent();
                triggerCostPulse();
            });
        });
    }

    // --- 6. CONTACT FORM REAL-TIME VALIDATION SYSTEM ---
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        const fields = {
            name: {
                el: document.getElementById("name"),
                validate: val => val !== "" && /^[A-Za-zĞğİıÖöŞşÜüÇç\s]+$/.test(val),
                error: "Name is required and must contain letters only."
            },
            surname: {
                el: document.getElementById("surname"),
                validate: val => val !== "" && /^[A-Za-zĞğİıÖöŞşÜüÇç\s]+$/.test(val),
                error: "Surname is required and must contain letters only."
            },
            comments: {
                el: document.getElementById("comments"),
                validate: val => val.length >= 10,
                error: "Comments must be at least 10 characters long."
            }
        };

        Object.keys(fields).forEach(key => {
            const field = fields[key];
            field.el.addEventListener("input", () => {
                const val = field.el.value.trim();
                if (field.validate(val)) {
                    field.el.classList.remove("error");
                    field.el.style.boxShadow = "0 0 8px rgba(16, 185, 129, 0.4)";
                    field.el.style.borderColor = "var(--success)";
                } else {
                    field.el.style.boxShadow = "";
                    field.el.style.borderColor = "";
                }
            });
        });

        contactForm.addEventListener("submit", event => {
            event.preventDefault();
            let errors = [];

            Object.keys(fields).forEach(key => {
                const field = fields[key];
                const val = field.el.value.trim();
                if (!field.validate(val)) {
                    errors.push(field.error);
                    field.el.classList.add("error");
                } else {
                    field.el.classList.remove("error");
                }
            });

            const resultContainer = document.getElementById("contact-result");
            if (errors.length > 0) {
                resultContainer.textContent = errors.join(" ");
                resultContainer.className = "result-error";
                resultContainer.style.display = "block";
            } else {
                resultContainer.innerHTML = "✨ Your message was sent successfully! We will contact you soon.";
                resultContainer.className = "result-success";
                resultContainer.style.display = "block";
                
                Object.keys(fields).forEach(key => {
                    const field = fields[key];
                    field.el.style.boxShadow = "";
                    field.el.style.borderColor = "";
                });

                contactForm.reset();
                triggerConfetti(); // Confetti on contact success too!
            }
        });
    }

    // --- 7. CHECKOUT CREDIT CARD MOCK MASKS ---
    const cardNumberInput = document.getElementById("card-number");
    const cardExpiryInput = document.getElementById("card-expiry");
    const cardCvcInput = document.getElementById("card-cvc");

    if (cardNumberInput) {
        cardNumberInput.addEventListener("input", e => {
            let val = e.target.value.replace(/\D/g, "");
            let formatted = val.match(/.{1,4}/g);
            e.target.value = formatted ? formatted.join(" ") : "";
        });
    }

    if (cardExpiryInput) {
        cardExpiryInput.addEventListener("input", e => {
            let val = e.target.value.replace(/\D/g, "");
            if (val.length >= 2) {
                e.target.value = val.substring(0, 2) + "/" + val.substring(2, 4);
            } else {
                e.target.value = val;
            }
        });
    }

    if (cardCvcInput) {
        cardCvcInput.addEventListener("input", e => {
            e.target.value = e.target.value.replace(/\D/g, "");
        });
    }

    // --- 8. GLOBAL BUTTON ACTIVE STATE CURSOR RIPPLE ---
    document.addEventListener("click", (e) => {
        const button = e.target.closest("button");
        if (!button) return;

        const ripple = document.createElement("span");
        ripple.className = "ripple-effect";

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;

        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);

        ripple.addEventListener("animationend", () => {
            ripple.remove();
        });
    });
});

// --- 9. DYNAMIC CART BADGE STATE SYNC ---
function updateCartBadge(count) {
    if (count === undefined) {
        count = sessionStorage.getItem("cartItemsCount") || "0";
    } else {
        sessionStorage.setItem("cartItemsCount", count);
    }
    
    const badge = document.getElementById("cart-badge");
    if (badge) {
        const prevCount = badge.textContent;
        badge.textContent = count;
        
        if (prevCount !== String(count)) {
            badge.classList.add("bump");
            setTimeout(() => {
                badge.classList.remove("bump");
            }, 400);
        }
        
        // Hide badge if count is 0
        if (parseInt(count) === 0) {
            badge.style.display = "none";
        } else {
            badge.style.display = "inline-block";
        }
    }
}

// --- 10. DYNAMIC PACKAGE DETAILS MODAL DATA & SKELETONS ---
const planDetailsData = {
    'student': {
        title: "Student Pack",
        image: "studentpack.png",
        subtitle: "Ultimate high-performance student rates",
        features: [
            "20 GB High-Speed 5G Mobile Data",
            "1000 National & Local Call Minutes",
            "1000 Direct SMS / Network Texts",
            "Unlimited zoom & educational team data integration",
            "Free campus calling circle for all students",
            "No contract - fully cancel/renew at will"
        ]
    },
    'teacher': {
        title: "Teacher Pack",
        image: "teacherpack.png",
        subtitle: "Essential tools for digital classrooms",
        features: [
            "35 GB Premium High-Speed Data",
            "2000 National & Local Call Minutes",
            "1500 Direct Network Texts",
            "Zero-rate access to school platforms & library networks",
            "5 GB shared family/colleague hotspot tethering",
            "24/7 Priority support hotline"
        ]
    },
    'mega': {
        title: "Mega Pack",
        image: "megapack.png",
        subtitle: "Elite ultimate mobile communication",
        features: [
            "100 GB Full Speed 5G Mobile Data",
            "Unlimited Call Minutes to all networks",
            "Unlimited Direct Network Texts",
            "5 GB Free High-Speed roaming data included",
            "Immediate premium eSIM online activation support",
            "Dedicated elite account manager"
        ]
    },
    'ciuspecial': {
        title: "CIU Special Pack",
        image: "ciuspecial.png",
        subtitle: "Tailored specifically for our campus",
        features: [
            "50 GB Campus-Optimized 5G Data",
            "3000 National & Local Call Minutes",
            "2000 Direct SMS Texts",
            "Free priority login to all campus Wi-Fi spots",
            "Exclusive zero-rate campus staff calls",
            "40% Academic discount compared to standard rates"
        ]
    }
};

let activeModalPlan = "";

function openDetails(planId) {
    const modal = document.getElementById("details-modal");
    const data = planDetailsData[planId];
    if (!modal || !data) return;

    activeModalPlan = planId;
    modal.classList.add("active");

    // Inject high-fidelity shimmering skeleton structures first
    document.getElementById("modal-image").style.display = "none";
    document.getElementById("modal-title").innerHTML = `<span class="skeleton-loader large" style="width: 160px; margin-bottom: 0;"></span>`;
    document.getElementById("modal-subtitle").innerHTML = `<span class="skeleton-loader" style="width: 100px;"></span>`;
    
    const listContainer = document.getElementById("modal-features");
    listContainer.innerHTML = `
        <li><span class="skeleton-loader" style="width: 90%;"></span></li>
        <li><span class="skeleton-loader" style="width: 75%;"></span></li>
        <li><span class="skeleton-loader" style="width: 85%;"></span></li>
        <li><span class="skeleton-loader" style="width: 60%;"></span></li>
    `;

    const buyBtn = document.getElementById("modal-buy-btn");
    if (buyBtn) buyBtn.style.opacity = "0.5";

    // Simulate mock database network latency (500ms)
    setTimeout(() => {
        document.getElementById("modal-image").src = data.image;
        document.getElementById("modal-image").alt = data.title;
        document.getElementById("modal-image").style.display = "block";
        document.getElementById("modal-title").textContent = data.title;
        document.getElementById("modal-subtitle").textContent = data.subtitle;

        listContainer.innerHTML = "";
        data.features.forEach(feat => {
            const li = document.createElement("li");
            li.textContent = feat;
            listContainer.appendChild(li);
        });

        if (buyBtn) buyBtn.style.opacity = "1";
    }, 500);
}

function closeDetails() {
    const modal = document.getElementById("details-modal");
    if (modal) modal.classList.remove("active");
}

function buyPlanFromModal() {
    if (activeModalPlan) {
        sessionStorage.setItem("buyPlan", activeModalPlan);
        location.href = "shopping.html";
    }
}

// --- 11. CART CALCULATION LOGIC (REACTIVE ENGINE) ---
let globalCalculatedTotal = 0;

function calculateTotalSilent() {
    let totalCost = 0;
    let totalItemsCount = 0;
    let taxDiscountMessage = "";
    
    const items = document.querySelectorAll('input[name="item"]:checked');

    items.forEach(item => {
        const code = item.value;
        const itemProperty = document.querySelector(`input[name="${code}-property"]:checked`);
        const itemQuantity = document.querySelector(`select[name="${code}-quantity"]`).value;

        const itemCostCell = document.getElementById(`cost${code.charAt(code.length - 1)}`);
        const costParagraph = itemCostCell ? itemCostCell.querySelector('p') : null;

        if (itemProperty && ["1", "2", "3"].includes(itemQuantity)) {
            const itemCost = parseFloat(itemProperty.value) * parseInt(itemQuantity);
            totalCost += itemCost;
            totalItemsCount += parseInt(itemQuantity);
            if (costParagraph) {
                costParagraph.textContent = `$${itemCost.toFixed(2)}`;
            }
        } else {
            if (costParagraph) costParagraph.textContent = `$0.00`;
        }
    });

    document.querySelectorAll('input[name="item"]').forEach(item => {
        if (!item.checked) {
            const code = item.value;
            const itemCostCell = document.getElementById(`cost${code.charAt(code.length - 1)}`);
            const costParagraph = itemCostCell ? itemCostCell.querySelector('p') : null;
            const itemRadios = document.querySelectorAll(`input[name="${code}-property"]`);

            if (costParagraph) costParagraph.textContent = `$0.00`;
            itemRadios.forEach(radio => {
                radio.checked = false;
            });
        }
    });

    // Subtotal before taxes
    const subtotalText = document.querySelector('#total-cost-before-tax p');
    if (subtotalText) subtotalText.textContent = `$${totalCost.toFixed(2)}`;

    // Tax or discount logic
    let taxOrDiscount = 0;
    if (totalCost > 0) {
        if (totalCost < 200) {
            taxOrDiscount = totalCost * 0.15;
            taxDiscountMessage = `Tax (15%): +$${taxOrDiscount.toFixed(2)}`;
            totalCost += taxOrDiscount;
        } else {
            taxOrDiscount = totalCost * 0.15;
            taxDiscountMessage = `Discount (15%): -$${taxOrDiscount.toFixed(2)}`;
            totalCost -= taxOrDiscount;
        }
    } else {
        taxDiscountMessage = `Tax/Discount: $0.00`;
    }

    globalCalculatedTotal = totalCost;

    const discountLabel = document.getElementById('tax-discount');
    const totalLabel = document.getElementById('total-cost');

    if (discountLabel) discountLabel.innerText = taxDiscountMessage;
    if (totalLabel) totalLabel.innerText = `Total Cost: $${totalCost.toFixed(2)}`;

    // Sync Cart Navigation Badge
    updateCartBadge(totalItemsCount);
}

function triggerCostPulse() {
    const pulseTargets = [
        document.querySelector('#total-cost-before-tax p'),
        document.getElementById('total-cost'),
        document.getElementById('cart-badge')
    ];

    pulseTargets.forEach(target => {
        if (target) {
            target.classList.add("cost-updated-glow");
            setTimeout(() => {
                target.classList.remove("cost-updated-glow");
            }, 600);
        }
    });
}

// --- 12. INTERACTIVE CHECKOUT MODAL LOGIC ---
function openCheckout() {
    if (globalCalculatedTotal <= 0) {
        alert("🛒 Please select a package, pick a plan type, and specify a quantity greater than zero to proceed to checkout!");
        return;
    }

    const modal = document.getElementById("checkout-modal");
    const summaryText = document.getElementById("checkout-summary-text");

    if (modal && summaryText) {
        summaryText.innerHTML = `Your total cost is <strong style="font-size: 1.3rem; color: var(--primary);">$${globalCalculatedTotal.toFixed(2)}</strong> (including 15% tax/discount).`;
        modal.classList.add("active");
    }
}

function closeCheckout() {
    const modal = document.getElementById("checkout-modal");
    if (modal) modal.classList.remove("active");
}

function submitCheckout(event) {
    event.preventDefault();

    const name = document.getElementById("card-name").value.trim();
    const number = document.getElementById("card-number").value.replace(/\s/g, "");
    const expiry = document.getElementById("card-expiry").value.trim();
    const cvc = document.getElementById("card-cvc").value.trim();

    if (name === "" || number.length !== 16 || expiry.length !== 5 || cvc.length !== 3) {
        alert("❌ Please verify your credit card details. Number must be 16 digits, Expiry must be MM/YY, CVC must be 3 digits.");
        return;
    }

    // Simulate completion
    const submitBtn = event.target.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Processing secure payment...";
    submitBtn.disabled = true;

    setTimeout(() => {
        // Trigger high-fidelity Confetti particles cascade!
        triggerConfetti();

        // Show elegant successful prompt inside modal content area instead of raw prompt alerts
        const modalBody = document.querySelector("#checkout-modal .modal-body");
        const originalBodyHTML = modalBody.innerHTML;

        modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px 0;" class="animate-on-scroll visible">
                <div style="font-size: 4rem; color: var(--success); margin-bottom: 15px; animation: zoomIn 0.5s;">🎉</div>
                <h2 style="color: var(--success); font-size: 1.8rem;">Subscribed successfully!</h2>
                <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 10px; font-weight: 500;">
                    Thank you, <strong>${name}</strong>. Your mock transaction of <strong>$${globalCalculatedTotal.toFixed(2)}</strong> was approved successfully! Your subscription to CIU-Cell is now fully active.
                </p>
                <button onclick="closeCheckout(); location.reload();" style="margin-top: 25px; min-width: 150px;">Sweet!</button>
            </div>
        `;
        
        // Reset forms in background
        const shoppingForm = document.getElementById("shopping-form");
        if (shoppingForm) shoppingForm.reset();
        sessionStorage.setItem("cartItemsCount", "0");
    }, 1200);
}

// --- 13. CLIENT-SIDE SIMULATED GRAVITY PARTICLE CONFETTI RAIN SYSTEM ---
function triggerConfetti() {
    const colors = ["#ff007f", "#ff5e00", "#ffbd59", "#00ffcc", "#0072ff", "#9d4edd", "#10b981", "#ef4444"];
    const particleCount = 90;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "confetti-particle";
        
        const size = Math.random() * 8 + 6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        
        // Random horizontal entry, starting slightly above top of screen
        particle.style.left = `${Math.random() * window.innerWidth}px`;
        particle.style.top = `-20px`;
        
        // Physics trajectory variables
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 7 + 4;
        const xVelocity = Math.cos(angle) * velocity * 0.5;
        let yVelocity = Math.random() * 4 + 2; 
        let rotation = Math.random() * 360;
        const rotationSpeed = Math.random() * 8 - 4;
        let opacity = 1;
        
        document.body.appendChild(particle);
        
        let startTimestamp = null;
        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            
            // Gravity downward pull
            yVelocity += 0.08;
            const currentTop = parseFloat(particle.style.top) + yVelocity;
            const currentLeft = parseFloat(particle.style.left) + xVelocity;
            rotation += rotationSpeed;
            
            particle.style.top = `${currentTop}px`;
            particle.style.left = `${currentLeft}px`;
            particle.style.transform = `rotate(${rotation}deg)`;
            
            // Fade out smoothly towards screen bottoms
            if (currentTop > window.innerHeight * 0.6) {
                opacity -= 0.015;
                particle.style.opacity = opacity;
            }
            
            if (currentTop < window.innerHeight && opacity > 0) {
                requestAnimationFrame(step);
            } else {
                particle.remove();
            }
        }
        requestAnimationFrame(step);
    }
}

// Map window helper functions so inline HTML triggers function correctly
window.openDetails = openDetails;
window.closeDetails = closeDetails;
window.buyPlanFromModal = buyPlanFromModal;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.submitCheckout = submitCheckout;
