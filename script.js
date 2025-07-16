let totalCreditos = 0;

fetch('data_DER.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('malla');
    const creditDisplay = document.getElementById('total-creditos');

    for (let semestre in data) {
      const box = document.createElement('div');
      box.className = 'semestre';
      const title = document.createElement('h2');
      title.textContent = semestre.toUpperCase();
      box.appendChild(title);

      data[semestre].forEach(ramo => {
        const ramoDiv = document.createElement('div');
        ramoDiv.className = 'ramo';
        ramoDiv.textContent = `${ramo[0]} (${ramo[1]}) - ${ramo[2]} créditos`;
        ramoDiv.dataset.creditos = ramo[2];

        // Manejo de selección de ramos
        ramoDiv.addEventListener('click', () => {
          const creditos = parseInt(ramoDiv.dataset.creditos);
          if (!ramoDiv.classList.contains('selected')) {
            ramoDiv.classList.add('selected');
            totalCreditos += creditos;
          } else {
            ramoDiv.classList.remove('selected');
            totalCreditos -= creditos;
          }
          creditDisplay.textContent = totalCreditos;
        });

        box.appendChild(ramoDiv);
      });

      container.appendChild(box);
    }
  });
