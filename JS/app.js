// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Código para los pasos e información
    const paso = document.getElementsByClassName('paso');
    const info = document.getElementsByClassName('info');

    for (let i = 0; i < paso.length; i++) {
        paso[i].addEventListener('click', () => {
            info[i].classList.toggle('show');
            if (info[i].classList.contains('show')) {
                info[i].style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), max-height 0.7s cubic-bezier(0.4,0,0.2,1)';
                info[i].style.boxShadow = '0 8px 24px rgba(37,117,252,0.13)';
                info[i].style.background = '#fff';
                info[i].style.transform = 'scale(1.03)';
                paso[i].style.background = '#2575fc';
                paso[i].style.color = '#fff';
                info[i].style.color = '#2575fc';
            } else {
                info[i].style.transition = 'opacity 0.5s, max-height 0.5s, box-shadow 0.3s, background 0.3s, transform 0.3s';
                info[i].style.boxShadow = '4px 4px 5px rgba(0, 0, 0, 0.1)';
                info[i].style.background = '#fff';
                info[i].style.transform = 'scale(1)';
                paso[i].style.background = 'transparent';
                paso[i].style.color = '#2575fc';
            }
        });
    }

    // Navbar section toggling and creative effects
    const inicioSection = document.getElementById('inicioSection');
    const objetivosSection = document.getElementById('objetivosSection');
    const integrantesSection = document.getElementById('integrantesSection');
    const calculadoraSection = document.getElementById('calculadoraSection');

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

    function showSection(section) {
        inicioSection.style.display = section === 'inicio' ? 'block' : 'none';
        objetivosSection.style.display = section === 'objetivos' ? 'block' : 'none';
        integrantesSection.style.display = section === 'integrantes' ? 'block' : 'none';
        calculadoraSection.style.display = section === 'calculadora' ? 'block' : 'none';
    }

    // Event listeners para la navegación
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

    // Mostrar sección de inicio por defecto
    showSection('inicio');

    // --- Lógica de cálculo de la calculadora ---
    const calcularBtn = document.getElementById('calcularBtn');

    if (!calcularBtn) {
        console.error('No se encontró el botón calcularBtn en el DOM');
        return;
    }

    calcularBtn.addEventListener('click', () => {
        console.log('Botón calcular presionado'); // Para debug
        
        const a = parseFloat(document.getElementById('a').value);
        const b = parseFloat(document.getElementById('b').value);

        console.log('Valores a:', a, 'b:', b); // Para debug

        if (isNaN(a) || isNaN(b)) {
            alert('Por favor ingresa valores válidos para a y b.');
            return;
        }

        const denominador = a * a + b * b;
        if (denominador === 0) {
            alert('Los valores de a y b no pueden ser ambos cero.');
            return;
        }        const x = (a * b * b) / denominador;
        const y = (a * a * b) / denominador;
        const C = Math.abs(a * b) / Math.sqrt(denominador);

        console.log('Resultados calculados:', {x, y, C}); // Para debug

        const resultadosDiv = document.getElementById('optResultados');
        resultadosDiv.style.display = 'block';

        // Calcular intervalos para X y Y
        const intervaloX = a < 0 ? `X: [${a}, 0]` : `X: [0, ${a}]`;
        const intervaloY = b < 0 ? `Y: [${b}, 0]` : `Y: [0, ${b}]`;
        
        const intervaloSpan = document.getElementById('intervalo');
        intervaloSpan.textContent = `${intervaloX}, ${intervaloY}`;

        document.getElementById('optX').textContent = x.toFixed(4);
        document.getElementById('optY').textContent = y.toFixed(4);
        document.getElementById('optC').textContent = C.toFixed(4);
    });    
    
    // Mostrar/ocultar el iframe de GeoGebra
    const toggleGeoGebra = document.getElementById('toggleGeoGebra');
    const geogebraFrameWrapper = document.getElementById('geogebraFrameWrapper');
    const geogebraFrameWrapper2 = document.getElementById('geogebraFrameWrapper2');
    
    if (toggleGeoGebra && geogebraFrameWrapper && geogebraFrameWrapper2) {
        toggleGeoGebra.addEventListener('click', function() {
            if (geogebraFrameWrapper.style.display === 'none' || geogebraFrameWrapper.style.display === '') {
                geogebraFrameWrapper.style.display = 'block';
                geogebraFrameWrapper2.style.display = 'block';
            } else {
                geogebraFrameWrapper.style.display = 'none';
                geogebraFrameWrapper2.style.display = 'none';
            }
        });
    }
});
