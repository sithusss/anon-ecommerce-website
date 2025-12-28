/**
 * 1. Product Dictionary & Cart Array
 */
const productData = {
  "p1": { price: 48.00, name: "Mens Winter Jacket" },
  "p2": { price: 45.00, name: "Mens Casual Shirt" },
  "p3": { price: 58.00, name: "Better Sport Shoes" },
  "p4": { price: 32.00, name: "Leather Watch" },
  "p5": { price: 25.00, name: "Floral Summer Dress" },
  "p6": { price: 75.00, name: "Denim Jacket" },
  "p7": { price: 15.00, name: "Woolen Hat" },
  "p8": { price: 22.00, name: "Silver Necklace" }
};

let shoppingCart = []; // Array to hold item IDs

/**
 * 2. Modal Logic with Popup Actions
 */
function openProductPopup(showcase) {
  const productId = showcase.getAttribute('data-id');
  const productInfo = productData[productId];
  if (!productInfo) return;

  const modal = document.getElementById('product-details-modal');
  const content = document.getElementById('product-details-content');
  const imgSource = showcase.querySelector('.product-img.default').src;

  content.innerHTML = `
    <div style="text-align:center; position:relative;">
      <button id="popup-close-btn" style="position:absolute; top:1rem; right:1rem; background:none; border:none; font-size:1.5rem; color:#e94560; cursor:pointer;">&times;</button>
      <img src="${imgSource}" alt="${productInfo.name}" style="width:100%; border-radius:8px;">
      <h2 style="margin: 1rem 0 0.5rem;">${productInfo.name}</h2>
      <p style="font-size:1.2rem; color:var(--salmon-pink); font-weight:700;">$${productInfo.price.toFixed(2)}</p>
      <div style="display:flex; gap:10px; margin-top:1.5rem;">
        <button id="add-to-cart-btn" style="flex:1; padding:10px; cursor:pointer; background:var(--salmon-pink); color:white; border:none; border-radius:5px; font-weight:600;">Add to Cart</button>
        <button id="popup-checkout-btn" style="flex:1; padding:10px; cursor:pointer; border:2px solid var(--salmon-pink); color:#e94560; background:white; border-radius:5px; font-weight:600;">Checkout</button>
      </div>
    </div>
  `;

  // Add to Cart Event
  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    shoppingCart.push(productId);
    alert(`${productInfo.name} added to cart!`);
    console.log("Current Cart IDs:", shoppingCart);
    closeModal();
  });

  // Checkout Event
  document.getElementById('popup-checkout-btn').addEventListener('click', () => {
    alert("Checkout successful. Thank you!");
    shoppingCart = []; // Reset cart
    closeModal();
  });

  // X Close Button
  document.getElementById('popup-close-btn').addEventListener('click', closeModal);

  modal.style.display = 'flex';
  modal.style.visibility = 'visible';
  modal.style.opacity = '1';
}

function closeModal() {
  const modal = document.getElementById('product-details-modal');
  modal.style.opacity = '0';
  modal.style.visibility = 'hidden';
  setTimeout(() => { modal.style.display = 'none'; }, 150);
}

// Assign IDs if not in HTML and add click event
const showcases = document.querySelectorAll('.product-grid .showcase');

showcases.forEach((item, index) => {
  const pId = item.getAttribute('data-id') || `p${index + 1}`;
  item.setAttribute('data-id', pId);
  const content = item.querySelector('.showcase-content');
  if (content) {
    content.style.cursor = 'pointer';
    content.addEventListener('click', function(e) {
      e.stopPropagation();
      const data = productData[pId];
      const imgSrc = item.querySelector('.product-img.default')?.src || item.querySelector('.product-img')?.src || '';
      activeProductId = pId;
      document.getElementById('modal-body-content').innerHTML = `
        <img src="${imgSrc}" style="width:150px; margin-bottom:15px;">
        <h3>${data.name}</h3>
        <p style="font-size:1.2rem; color:#e94560; font-weight:bold;">$${data.price.toFixed(2)}</p>
      `;
      const modal = document.getElementById('product-details-modal');
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';

      // Attach modal button event listeners every time modal is opened
      const addToCartBtn = document.getElementById('modal-add-to-cart');
      if (addToCartBtn) {
        addToCartBtn.onclick = function() {
          if (activeProductId) {
            shoppingCart.push(activeProductId);
            alert(`${data.name} added to cart!`);
            closeModal();
          }
        };
      }
      const checkoutBtn = document.getElementById('modal-checkout');
      if (checkoutBtn) {
        checkoutBtn.onclick = function() {
          alert('Checkout successful. Thank you!');
          shoppingCart = [];
          closeModal();
        };
      }
      const closeModalBtn = document.getElementById('close-modal-btn');
      if (closeModalBtn) {
        closeModalBtn.onclick = closeModal;
      }
    });
  }
});

// 3. Add to Cart Logic
const addToCartBtn = document.getElementById('modal-add-to-cart');
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    if (activeProductId) {
      myCart.push(activeProductId);
      showToast('Added to Cart!');
      closeProductModal();
      updateCartCount();
    }
  });
}

// Update cart count in header
function updateCartCount() {
  const countSpan = document.querySelector('.header-user-actions .count');
  if (countSpan) countSpan.textContent = myCart.length;
}

// 2. Bag handle icon as button and open sidebar
const bagBtn = document.querySelector('.header-user-actions .action-btn');
if (bagBtn) {
  bagBtn.addEventListener('click', function() {
    showCartSidebar();
  });
}

function showCartSidebar() {
  const sidebar = document.getElementById('cart-sidebar');
  if (!sidebar) return;
  // Populate cart items
  const content = document.getElementById('cart-sidebar-content');
  if (content) {
    if (myCart.length === 0) {
      content.innerHTML = '<p style="color:#888;">Your cart is empty.</p>';
    } else {
      content.innerHTML = myCart.map(pid => {
        const prod = productDictionary[pid];
        return `<div style=\"display:flex;align-items:center;gap:10px;margin-bottom:12px;\"><span style=\"flex:1;\">${prod.name}</span><span style=\"color:#e94560;font-weight:600;\">$${prod.price.toFixed(2)}</span></div>`;
      }).join('');
    }
  }
  sidebar.style.right = '0';
}

// Close sidebar logic
const closeSidebarBtn = document.getElementById('close-cart-sidebar');
if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener('click', function() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.style.right = '-400px';
  });
}

// Toast message function
function showToast(message) {
  let toast = document.getElementById('custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '40px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#e94560';
    toast.style.color = 'white';
    toast.style.padding = '16px 32px';
    toast.style.borderRadius = '8px';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '1rem';
    toast.style.zIndex = '10001';
    toast.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 2000);
}

// 5. Close Modal Function
function closeProductModal() {
  const modal = document.getElementById('product-details-modal');
  modal.style.opacity = '0';
  setTimeout(() => { modal.style.visibility = 'hidden'; }, 300);
}

const closeModalBtn = document.getElementById('close-modal-btn');
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeProductModal);
}

// Remove the template's auto-popup
window.addEventListener('load', () => {
  const oldModal = document.querySelector('[data-modal]');
  if (oldModal) oldModal.remove();
});

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}