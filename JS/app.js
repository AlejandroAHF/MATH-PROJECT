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
// Obtener referencia a la sección Calculadora solo una vez
const calculadoraSection = document.getElementById('calculadoraSection');

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
document.getElementById('btnCalculadora').addEventListener('click', () => {
    showSection('calculadora');
});

function showSection(section) {
    inicioSection.style.display = section === 'inicio' ? 'block' : 'none';
    objetivosSection.style.display = section === 'objetivos' ? 'block' : 'none';
    integrantesSection.style.display = section === 'integrantes' ? 'block' : 'none';
    calculadoraSection.style.display = section === 'calculadora' ? 'block' : 'none';
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

// --- Cálculo interactivo de valores de a y b ---
const btnCalcularValores = document.getElementById('btnCalcularValores');
const formValoresContainer = document.getElementById('formValoresContainer');
const formValores = document.getElementById('formValores');
const resultadoValores = document.getElementById('resultadoValores');

btnCalcularValores.addEventListener('click', () => {
    formValoresContainer.style.display = formValoresContainer.style.display === 'none' ? 'block' : 'none';
});

formValores.addEventListener('submit', function(e) {
    e.preventDefault();
    const a = parseFloat(document.getElementById('inputA').value);
    const b = parseFloat(document.getElementById('inputB').value);
    if (isNaN(a) || isNaN(b) || a === 0) {
        resultadoValores.innerHTML = '<span style="color:red;">Por favor ingresa valores válidos y asegúrate que a ≠ 0.</span>';
        return;
    }
    // Fórmulas
    const x = (a * b * b) / (a * a + b * b);
    const y = Math.abs(a * b) / Math.sqrt(a * a + b * b);
    const yLine = (-(b / a) * x + b);
    const c = Math.sqrt(x * x + yLine * yLine);
    resultadoValores.innerHTML =
        `<b>Resultados:</b><br>
        x = ${x.toFixed(4)}<br>
        y = ${y.toFixed(4)}<br>
        c = ${c.toFixed(4)}<br>
        <span style='color:#2575fc;'>Punto mínimo: (x, y) = (${x.toFixed(4)}, ${y.toFixed(4)})</span>`;
});

// --- Mostrar sección Calculadora y lógica de cálculo ---
const btnCalculadora = document.getElementById('btnCalculadora');
const optForm = document.getElementById('optForm');
const optResultados = document.getElementById('optResultados');
const intervaloSpan = document.getElementById('intervalo');
const optXSpan = document.getElementById('optX');
const optYSpan = document.getElementById('optY');
const optCSpan = document.getElementById('optC');

// Mostrar solo la sección de la calculadora
btnCalculadora.addEventListener('click', () => {
    inicioSection.style.display = 'none';
    objetivosSection.style.display = 'none';
    integrantesSection.style.display = 'none';
    calculadoraSection.style.display = 'block';
});

optForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    if (isNaN(a) || isNaN(b) || a === 0) {
        optResultados.style.display = 'block';
        intervaloSpan.textContent = '';
        optXSpan.textContent = '';
        optYSpan.textContent = '';
        optCSpan.innerHTML = '<span style="color:red;">Por favor ingresa valores válidos y asegúrate que a ≠ 0.</span>';
        return;
    }
    // Intervalo
    let intervalo = a > 0 ? `[0, ${a}]` : `[${a}, 0]`;
    intervaloSpan.textContent = intervalo;
    // Cálculos
    const x = (a * b * b) / (a * a + b * b);
    const y = (a * a * b) / (a * a + b * b);
    const c = Math.abs(a * b) / Math.sqrt(a * a + b * b);
    optXSpan.textContent = x.toFixed(4);
    optYSpan.textContent = y.toFixed(4);
    optCSpan.textContent = c.toFixed(4);
    optResultados.style.display = 'block';
});
