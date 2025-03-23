document.addEventListener('DOMContentLoaded', () => {
    handleHamburgerMenu();
});

function handleHamburgerMenu() {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const checkbox = hamburgerIcon?.getElementsByTagName('input')[0];
    checkbox?.addEventListener('input', () => {
        if(checkbox.checked) {
            handleClickout(checkbox);
        }
        return false;
    });
}

function handleClickout(checkbox: HTMLInputElement) {
    const header = document.querySelector('header');
    document.addEventListener('click', (event) => {
        if(header?.contains(event.target as Node) === false
            || event.target instanceof HTMLAnchorElement
        ) {
            checkbox.checked = false;
        }
    });

}
