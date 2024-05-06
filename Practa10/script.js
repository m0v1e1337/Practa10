// Объект для управления модальным окном
const addModal = new bootstrap.Modal('#addModal');

// Функция для отображения модального окна и формы
function showAddForm() {
    const modalBody = document.querySelector('#addModal .modal-body');
    modalBody.innerHTML = `
        <form id="component-form">
            <div class="form-group">
                <label for="component-type">Тип компонента:</label>
                <select class="form-control" id="component-type">
                    <option value="processor">Процессор</option>
                    <option value="ram">Оперативная память</option>
                    <option value="harddrive">Жесткий диск</option>
                </select>
            </div>
            <div id="processor-fields" class="form-group" style="display: none;">
                <label for="processor-name">Название процессора:</label>
                <input type="text" class="form-control" id="processor-name">
                <label for="processor-cores">Количество ядер:</label>
                <input type="number" class="form-control" id="processor-cores">
            </div>
            <div id="ram-fields" class="form-group" style="display: none;">
                <label for="ram-capacity">Объем памяти:</label>
                <input type="number" class="form-control" id="ram-capacity">
                <label for="ram-frequency">Частота:</label>
                <input type="number" class="form-control" id="ram-frequency">
            </div>
            <div id="harddrive-fields" class="form-group" style="display: none;">
                <label for="harddrive-capacity">Объем диска:</label>
                <input type="number" class="form-control" id="harddrive-capacity">
                <label for="harddrive-type">Тип диска:</label>
                <input type="text" class="form-control" id="harddrive-type">
            </div>
        </form>
    `;

    // Объект для управления формой
    const form = new bootstrap.Form(document.getElementById('component-form'));

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
        addModal.hide(); // Скрываем модальное окно после добавления компонента
    });

    addModal.show(); // Отображаем модальное окно
}

// Обработчик события для кнопки "Добавить компонент"
document.querySelector('#addModal .btn-primary').addEventListener('click', showAddForm);
