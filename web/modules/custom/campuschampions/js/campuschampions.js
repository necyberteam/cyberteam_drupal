document.addEventListener('DOMContentLoaded', function () {
    const nationwide = document.getElementById('cc-nationwide');
    if (nationwide) {
        nationwide.innerHTML = nationwide.getAttribute('data-value');
    }

    const institutions = document.getElementById('cc-institutions');
    if (institutions) {
        institutions.innerHTML = institutions.getAttribute('data-value');
    }

    const epscor = document.getElementById('cc-epscor');
    if (epscor) {
        epscor.innerHTML = epscor.getAttribute('data-value');
    }

    const msi = document.getElementById('cc-msi');
    if (msi) {
        msi.innerHTML = msi.getAttribute('data-value');
    }
});
