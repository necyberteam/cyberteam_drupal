// Add current path to login url for redirect destination
const login = document.querySelector('.login-link')
if (login) {
    login.href = "/user/login?destination=" + window.location.pathname
}

/* secondary menu moves into the primary menu on mobile */
let universal_secondary_menu, primary_menu, secondary_menu, li;

const checkElement = async selector => {
    while (document.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return document.querySelector(selector);
};

// function to detect display width change
async function handleMobileMenu() {
    if (window.innerWidth < 768) {
        checkElement('#superfish-access-universal-nav-menu-accordion').then((selector) => {
            if (!selector.querySelector('#superfish-access-additional-universal-menu-accordion-clone')) {
                secondary_menu = document.getElementById('superfish-access-additional-universal-menu-accordion').cloneNode(true);
                // change id of secondary menu
                secondary_menu.id = 'superfish-access-additional-universal-menu-accordion-clone';
                secondary_menu.style.display = 'block';
                secondary_menu.classList.remove('sf-hidden');
                secondary_menu.classList.add('sf-expanded');

                li = document.createElement('li');
                li.appendChild(secondary_menu);
                selector.appendChild(li);

                // add event handlers and carets to secondary menuparents
                const i = document.createElement('i');
                i.classList.add('fa-solid')
                i.classList.add('fa-caret-down');
                const menuparents = secondary_menu.querySelectorAll('li.menuparent');
                menuparents.forEach(function (menuparent) {
                    menuparent.addEventListener('click', function (e) {
                        menuparent.classList.toggle('sf-expanded');
                        menuparent.querySelector('ul').classList.toggle('sf-hidden');
                    });
                    menuparent.querySelector('span').appendChild(i.cloneNode(true));
                });
            }
            universal_secondary_menu.style.display = 'none';
        });
    } else {
        universal_secondary_menu.style.display = 'block';
    }
}

// event handler to detect display width change
window.addEventListener('resize', function () {
    handleMobileMenu();
});

// on document ready
document.addEventListener('DOMContentLoaded', function () {
    universal_secondary_menu = document.getElementById('block-accessadditionaluniversalmenu-2');

    handleMobileMenu();
});
