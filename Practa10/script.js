let componentList = [];

function showAddForm() {
    const form = document.getElementById('component-form');
    form.innerHTML = `
    <label for="component-type">Тип компонента:</label>
    <select id="component-type">
      <option value="processor">Процессор</option>
      <option value="ram">Оперативная память</option>
      <option value="harddrive">Жесткий диск</option>
    </select>
    <div id="processor-fields" style="display: none;">
      <label for="processor-name">Название процессора:</label>
      <input type="text" id="processor-name">
      <label for="processor-cores">Количество ядер:</label>
      <input type="number" id="processor-cores">
    </div>
    <div id="ram-fields" style="display: none;">
      <label for="ram-capacity">Объем памяти:</label>
      <input type="number" id="ram-capacity">
      <label for="ram-frequency">Частота:</label>
      <input type="number" id="ram-frequency">
    </div>
    <div id="harddrive-fields" style="display: none;">
      <label for="harddrive-capacity">Объем диска:</label>
      <input type="number" id="harddrive-capacity">
      <label for="harddrive-type">Тип диска:</label>
      <input type="text" id="harddrive-type">
    </div>
    <button type="submit">Добавить</button>
  `;

    const componentTypeSelect = document.getElementById('component-type');
    const processorFields = document.getElementById('processor-fields');
    const ramFields = document.getElementById('ram-fields');
    const harddriveFields = document.getElementById('harddrive-fields');

    componentTypeSelect.addEventListener('change', () => {
        const selectedValue = componentTypeSelect.value;
        processorFields.style.display = selectedValue === 'processor' ? 'block' : 'none';
        ramFields.style.display = selectedValue === 'ram' ? 'block' : 'none';
        harddriveFields.style.display = selectedValue === 'harddrive' ? 'block' : 'none';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const componentType = componentTypeSelect.value;
        const component = {
            type: componentType,
        };

        switch (componentType) {
            case 'processor':
                const processorName = document.getElementById('processor-name').value;
                const processorCores = document.getElementById('processor-cores').value;
                component.name = processorName;
                component.cores = processorCores;
                break;
            case 'ram':
                const ramCapacity = document.getElementById('ram-capacity').value;
                const ramFrequency = document.getElementById('ram-frequency').value;
                component.capacity = ramCapacity;
                component.frequency = ramFrequency;
                break;
            case 'harddrive':
                const harddriveCapacity = document.getElementById('harddrive-capacity').value;
                const harddriveType = document.getElementById('harddrive-type').value;
                component.capacity = harddriveCapacity;
                component.type = harddriveType;
                break;
        }

        componentList.push(component);
        renderComponentList();
        form.reset();
    });

    const firstInput = form.querySelector('input, textarea');
    if (firstInput) {
        firstInput.focus();
    }
}

function renderComponentList() {
    const componentListElement = document.getElementById('component-list');
    componentListElement.innerHTML = '';

    componentList.forEach((component, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('component-item');

        let componentDetails;
        switch (component.type) {
            case 'processor':

                componentDetails = `Процессор: ${component.name}, ${component.cores} ядер`;
                break;
            case 'ram':
                componentDetails = `Оперативная память: ${component.capacity} ГБ, ${component.frequency} МГц`;
                break;
            case 'harddrive':
                componentDetails = `Жесткий диск: ${component.capacity} ГБ, ${component.type}`;
                break;
        }

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => {
            componentList.splice(index, 1);
            renderComponentList();
        });

        listItem.textContent = componentDetails;
        listItem.appendChild(removeButton);
        componentListElement.appendChild(listItem);
    });
}

document.getElementById('add-component-btn').addEventListener('click', showAddForm);
