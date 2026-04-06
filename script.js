document.addEventListener('DOMContentLoaded', () => {
    const optionsContainer = document.querySelector('[data-test-id="input-autocomplete-options-list"]');
    const wrapper = document.querySelector('.autocomplete-wrapper');
    const placeholder = document.querySelector('.placeholder');
    const input = document.getElementById('autocomplete');
    const suggestions = [
        "Балаково",
        "Барнаул",
        "Белгород",
        "Бийск",
        "Братск",
        "Владивосток",
        "Владикавказ",
        "Владимир",
        "Волгоград",
        "Волжский",
        "Воронеж",
        "Дзержинск",
        "Екатеринбург",
        "Железногорск",
        "Ижевск",
        "Иркутск",
        "Казань",
        "Калининград",
        "Кемерово",
        "Киров",
        "Краснодар",
        "Красноярск",
        "Курган",
        "Курск",
        "Липецк",
        "Москва",
        "Мурманск",
        "Набережные Челны",
        "Нижний Новгород",
        "Новокузнецк",
        "Новосибирск",
        "Омск",
        "Оренбург",
        "Пенза",
        "Пермь",
        "Ростов-на-Дону",
        "Рязань",
        "Самара",
        "Санкт-Петербург",
        "Саратов",
        "Смоленск",
        "Сочи",
        "Ставрополь",
        "Тольятти",
        "Томск",
        "Тула",
        "Тюмень",
        "Ульяновск",
        "Уфа",
        "Хабаровск",
        "Челябинск"
    ];
    function openSelect() {
        optionsContainer.classList.add('open');
        input.setAttribute('aria-expanded', 'true');
    }

    function closeSelect() {
        optionsContainer.classList.remove('open');
        input.setAttribute('aria-expanded', 'false');
        activeIndex = -1;
        clearActive();
    }

    let filteredSuggestions = [];
    let activeIndex = -1;

    function clearActive() {
        const options = optionsContainer.querySelectorAll('.input-autocomplete-option');
        options.forEach(option => option.classList.remove('active'));
    }

    function renderOptions(list) {
        optionsContainer.innerHTML = '';

        list.forEach(city => {
            const li = document.createElement('li');
            li.className = 'input-autocomplete-option';
            li.textContent = city;
            li.addEventListener('click', () => {
                input.value = city;
                placeholder.style.display = 'none';
                closeSelect();
            });

            optionsContainer.appendChild(li);
        });
    }

    input.addEventListener('keydown', (event) => {
        const options = optionsContainer.querySelectorAll('.input-autocomplete-option');

        if (!optionsContainer.classList.contains('open') || (options.length === 0)) {
            return;
        }

        if (event.key === 'ArrowDown') {
            activeIndex = activeIndex + 1;
            if (activeIndex >= options.length) {
                activeIndex = 0;
            }
            clearActive();
            options[activeIndex].classList.add('active');

            options[activeIndex].scrollIntoView({
                block: 'nearest'
            });
        }

        if (event.key === 'ArrowUp') {
            if (activeIndex === -1) return;

            activeIndex = activeIndex - 1;
            if (activeIndex < 0) {
                activeIndex = options.length - 1;
            }
            clearActive();
            options[activeIndex].classList.add('active');

            options[activeIndex].scrollIntoView({
                block: 'nearest'
            });
        }

        if (event.key === 'Enter' && activeIndex !== -1) {
            input.value = options[activeIndex].textContent;
            closeSelect();
        }
    });

    input.addEventListener('input', () => {
        const value = input.value.toLowerCase();

        if (value === '') {
            closeSelect();
            placeholder.style.display = '';
            return;
        }
        placeholder.style.display = 'none';

        filteredSuggestions = suggestions.filter(town =>
            town.toLowerCase().startsWith(value)
        );

        activeIndex = -1;
        clearActive();
        if (filteredSuggestions.length === 0) {
            optionsContainer.innerHTML = '';
            closeSelect();
            return;
        }
        renderOptions(filteredSuggestions);
        openSelect();
    });

    document.addEventListener('click', (event) => {
        if (!wrapper.contains(event.target)) {
            closeSelect();
        }
    });
});