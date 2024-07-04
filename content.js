document.addEventListener('focusin', (event) => {
  if (event.target.tagName === 'INPUT' && (event.target.id === 'first_name' || event.target.name === 'name')) {
    const inputElement = event.target;
    const inputId = inputElement.id;
    const inputName = inputElement.name;
    
    // Получаем сохраненное значение из chrome.storage
    chrome.storage.sync.get(['firstName'], (data) => {
      let suggestion = '';
      if (inputId === 'first_name' || inputName === 'name') {
        suggestion = data.firstName || '';
      }

      if (suggestion) {
        showSuggestionPopup(inputElement, suggestion);
      }
    });
  }
});

function showSuggestionPopup(inputElement, suggestion) {
  // Удаляем старый тултип, если он существует
  const oldTooltip = document.querySelector('.suggestion-popup');
  if (oldTooltip) {
    oldTooltip.remove();
  }

  // Создаем новый тултип
  const popup = document.createElement('div');
  popup.className = 'suggestion-popup';
  popup.innerText = `Insert "${suggestion}"`;
  popup.style.position = 'absolute';
  popup.style.background = '#fff';
  popup.style.border = '1px solid #ccc';
  popup.style.padding = '5px';
  popup.style.cursor = 'pointer';
  popup.style.zIndex = 1000;
  
  const rect = inputElement.getBoundingClientRect();
  popup.style.top = `${window.scrollY + rect.top - 30}px`;
  popup.style.left = `${window.scrollX + rect.left}px`;

  document.body.appendChild(popup);

  // Обработчик для вставки значения при клике на тултип
  popup.addEventListener('mousedown', (event) => {
    event.preventDefault(); // Предотвращаем потерю фокуса на поле ввода
    inputElement.value = suggestion;
    popup.remove();
  });

  // Удаление тултипа при потере фокуса
  inputElement.addEventListener('blur', () => {
    if (document.body.contains(popup)) {
      popup.remove();
    }
  }, { once: true });
}
