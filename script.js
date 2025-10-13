const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

const modal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginFeedback = document.getElementById('loginFeedback');
const modalClose = document.getElementById('modalClose');
const loginToggleButtons = [
    document.getElementById('loginToggle'),
    document.getElementById('loginToggleNav'),
    document.getElementById('loginToggleInventory')
].filter(Boolean);

const inventoryLocked = document.getElementById('inventoryLocked');
const inventoryList = document.getElementById('inventoryList');

const toggleModal = (open) => {
    if (!modal) return;
    if (open) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const emailInput = document.getElementById('loginEmail');
        if (emailInput) {
            setTimeout(() => emailInput.focus(), 50);
        }
    } else {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
};

loginToggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => toggleModal(true));
});

if (modalClose) {
    modalClose.addEventListener('click', () => toggleModal(false));
}

if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });
}

const applyInventoryState = (authenticated) => {
    if (!inventoryLocked || !inventoryList) return;
    if (authenticated) {
        inventoryLocked.classList.add('hidden');
        inventoryList.classList.remove('hidden');
    } else {
        inventoryLocked.classList.remove('hidden');
        inventoryList.classList.add('hidden');
    }
};

const AUTH_KEY = 'gm-authenticated';
const isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';
applyInventoryState(isAuthenticated);

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const email = String(formData.get('loginEmail') || '').trim().toLowerCase();

        if (!email.endsWith('@gmail.com')) {
            loginFeedback.textContent = 'Please use a Google email address (example@gmail.com).';
            loginFeedback.style.color = '#ff6b6b';
            return;
        }

        localStorage.setItem(AUTH_KEY, 'true');
        applyInventoryState(true);
        loginFeedback.textContent = 'Access granted. Inventory unlocked.';
        loginFeedback.style.color = '#66f7ff';
        setTimeout(() => {
            toggleModal(false);
            loginFeedback.textContent = '';
            loginForm.reset();
        }, 1200);
    });
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        toggleModal(false);
    }
});
