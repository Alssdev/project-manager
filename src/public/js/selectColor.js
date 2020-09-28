const select = document.getElementById('color');
const dividerColor = select.dataset.color;

const colors = ['black', 'dark', 'link', 'info', 'success', 'danger'];
const value = ['Negro', 'Gris', 'Azul', 'Celeste', 'Verde', 'Rojo'];

let options = '';
for (let i = 0; i < 6; i++) {
  const color = colors[i];

  if (color === dividerColor) {
    options += `<option value="${color}" class="has-text-${color}" selected>${value[i]}</option>\n`;
  } else {
    options += `<option value="${color}" class="has-text-${color}">${value[i]}</option>\n`;
  }
}

select.innerHTML = options;
