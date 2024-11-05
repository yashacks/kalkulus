let chart;

document.addEventListener('DOMContentLoaded', function() {
    setupInputs();
    initChart();
    updateAll();
});

function setupInputs() {
    ['a', 'b', 'c'].forEach(param => {
        const slider = document.getElementById(param);
        const numberInput = document.getElementById(`${param}-number`);
        const value = document.getElementById(`${param}-value`);

        slider.addEventListener('input', function() {
            value.textContent = this.value;
            numberInput.value = this.value;
            updateAll();
        });

        numberInput.addEventListener('input', function() {
            if (this.value === '') return;
            const numValue = parseFloat(this.value);
            if (numValue >= -10 && numValue <= 10) {
                slider.value = numValue;
                value.textContent = numValue;
                updateAll();
            }
        });

        numberInput.addEventListener('blur', function() {
            const numValue = parseFloat(this.value);
            if (numValue < -10) {
                this.value = -10;
                slider.value = -10;
                value.textContent = -10;
            } else if (numValue > 10) {
                this.value = 10;
                slider.value = 10;
                value.textContent = 10;
            }
            updateAll();
        });
    });
}

function updateAll() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    
    updateProperties(a, b, c);
    updateChart(a, b, c);
    updateFunctionNotation(a, b, c);  // Tambahkan baris ini
}

function updateProperties(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    const vertex = [-b / (2 * a), -discriminant / (4 * a)];
    const yIntercept = c;
    const xIntercepts = discriminant >= 0 ? 
        [(-b + Math.sqrt(discriminant)) / (2 * a), (-b - Math.sqrt(discriminant)) / (2 * a)] : 
        "No real roots";

    const propertiesDiv = document.getElementById('properties');
    propertiesDiv.innerHTML = `
        <p>Discriminant: ${discriminant.toFixed(2)}</p>
        <p>Vertex: (${vertex[0].toFixed(2)}, ${vertex[1].toFixed(2)})</p>
        <p>Y-intercept: ${yIntercept.toFixed(2)}</p>
        <p>X-intercepts: ${Array.isArray(xIntercepts) ? xIntercepts.map(x => x.toFixed(2)).join(', ') : xIntercepts}</p>
    `;
}

function initChart() {
    const ctx = document.getElementById('quadraticGraph').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Quadratic Function',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'center',
                    min: -20,
                    max: 20,
                    title: {
                        display: true,
                        text: 'x'
                    }
                },
                y: {
                    type: 'linear',
                    position: 'center',
                    min: -400,
                    max: 400,
                    title: {
                        display: true,
                        text: 'y'
                    }
                }
            }
        }
    });
}
function updateFunctionNotation(a, b, c) {
    let notation = 'f(x) = ';
    
    if (a !== 0) {
        notation += a === 1 ? 'x²' : a === -1 ? '-x²' : a + 'x²';
    }
    
    if (b !== 0) {
        if (b > 0 && a !== 0) notation += ' + ';
        notation += b === 1 ? 'x' : b === -1 ? '-x' : b + 'x';
    }
    
    if (c !== 0) {
        if (c > 0 && (a !== 0 || b !== 0)) notation += ' + ';
        notation += c;
    }
    
    if (a === 0 && b === 0 && c === 0) {
        notation += '0';
    }
    
    document.getElementById('function-notation').textContent = notation;
}
function updateChart(a, b, c) {
    const xValues = [];
    const yValues = [];
    for (let x = -100; x <= 100; x += 0.1) {
        xValues.push(x);
        yValues.push(a * x * x + b * x + c);
    }
    
    chart.data.labels = xValues;
    chart.data.datasets[0].data = yValues;
    chart.update();
}
