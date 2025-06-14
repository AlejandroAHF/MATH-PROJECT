const paso = document.getElementById('paso');
const info = document.getElementById('info');

paso.addEventListener('click', () => {
    info.classList.toggle('show');
    if (info.classList.contains('show')) {
        info.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), max-height 0.7s cubic-bezier(0.4,0,0.2,1)';
        info.style.boxShadow = '0 8px 24px rgba(37,117,252,0.13)';
        info.style.background = '#fff'; // Quitar gradiente, dejar fondo blanco
        info.style.transform = 'scale(1.03)';
    } else {
        info.style.transition = 'opacity 0.5s, max-height 0.5s, box-shadow 0.3s, background 0.3s, transform 0.3s';
        info.style.boxShadow = '4px 4px 5px rgba(0, 0, 0, 0.1)';
        info.style.background = '#fff';
        info.style.transform = 'scale(1)';
    }
});

// Navbar section toggling and creative effects
const inicioSection = document.getElementById('inicioSection');
const objetivosSection = document.getElementById('objetivosSection');
const integrantesSection = document.getElementById('integrantesSection');

document.getElementById('btnInicio').addEventListener('click', () => {
    showSection('inicio');
    animateText(inicioSection.querySelector('.creative-title'));
});
document.getElementById('btnObjetivos').addEventListener('click', () => {
    showSection('objetivos');
    animateList(objetivosSection.querySelectorAll('ul li'));
});
document.getElementById('btnIntegrantes').addEventListener('click', () => {
    showSection('integrantes');
    animateList(integrantesSection.querySelectorAll('li'));
});

function showSection(section) {
    inicioSection.style.display = section === 'inicio' ? 'block' : 'none';
    objetivosSection.style.display = section === 'objetivos' ? 'block' : 'none';
    integrantesSection.style.display = section === 'integrantes' ? 'block' : 'none';
}

// Creative text animation for Bienvenida
function animateText(element) {
    if (!element) return;
    const text = element.textContent;
    element.innerHTML = '';
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = 0;
        span.style.transition = `opacity 0.2s ${i * 0.04}s, color 0.2s ${i * 0.04}s`;
        element.appendChild(span);
        setTimeout(() => {
            span.style.opacity = 1;
            span.style.color = '#6a11cb';
        }, 50 + i * 40);
    });
}

// Creative list animation for Objetivos e Integrantes
function animateList(listItems) {
    if (!listItems) return;
    listItems.forEach((li, i) => {
        li.style.opacity = 0;
        li.style.transform = 'translateY(30px)';
        setTimeout(() => {
            li.style.transition = 'opacity 0.5s, transform 0.5s';
            li.style.opacity = 1;
            li.style.transform = 'translateY(0)';
        }, 100 + i * 180);
    });
}

// Mostrar sección de inicio por defecto
showSection('inicio');
