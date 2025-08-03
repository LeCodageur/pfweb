const backgroundMap = {
    "page-accueil": "center center",
    "page-top": "center top",
    "page-bottom": "center bottom",
    "page-left": "left center",
    "page-right": "right center",
    "page-right-top": "right top",
    "page-left-top": "left top",
    "page-left-bottom": "left bottom",
    "page-right-bottom": "right bottom"
};

function goTo(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");

    // Met à jour la position du fond
    const pos = backgroundMap[pageId] || "center center";
    document.body.style.backgroundPosition = pos;
}

function handleShadow(el) {
    const bottomReached = el.scrollHeight <= el.scrollTop + el.clientHeight + 1;
    if (!bottomReached) {
        el.classList.add("shadow-bottom");
    } else {
        el.classList.remove("shadow-bottom");
    }
}

// Appliquer dès le chargement
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".scrollable-content").forEach(el => handleShadow(el));
});

function observePagePiege() {
    const pagePiege = document.getElementById("page-piege");

    if (!pagePiege) return;

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (
                mutation.attributeName === "class" &&
                pagePiege.classList.contains("active")
            ) {
                // Redirection après 2.5 secondes
                setTimeout(() => {
                    goTo("page-accueil");
                }, 2000);
            }
        });
    });

    observer.observe(pagePiege, { attributes: true });
}

document.addEventListener("DOMContentLoaded", observePagePiege);

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

document.addEventListener("keydown", (e) => {
    // F12
    if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        alert("Fonction désactivée.");
    }

    // Ctrl+Shift+I / J / C
    if (
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U') // Ctrl+U
    ) {
        e.preventDefault();
        alert("Fonction désactivée.");
    }
});