document.addEventListener('focusin', (event) => {
  const inputElement = event.target;

  if (inputElement.tagName === 'INPUT') {
    const inputId = inputElement.id;
    const inputName = inputElement.name;
    const inputType = inputElement.type;
    const inputDataInput = inputElement.getAttribute('data-input');

    if (
      (inputId === 'first_name' || inputId === 'firstName' || inputName === 'name' || inputName === 'firstName' || inputDataInput === 'first_name') &&
      chrome.storage.sync.get(['firstName'], (data) => {
        const suggestion = data.firstName || '';
        if (suggestion) {
          showSuggestionPopup(inputElement, suggestion);
        }
      })
    ) {
      return;
    }

    if (
      (inputId === 'last_name' || inputId === 'lastName' || inputName === 'last_name' || inputName === 'lastName' || inputDataInput === 'last_name') &&
      chrome.storage.sync.get(['lastName'], (data) => {
        const suggestion = data.lastName || '';
        if (suggestion) {
          showSuggestionPopup(inputElement, suggestion);
        }
      })
    ) {
      return;
    }

    if (
      (inputId === 'email' || inputName === 'email' || inputType === 'email' || inputDataInput === 'email') &&
      chrome.storage.sync.get(['email'], (data) => {
        const suggestion = data.email || '';
        if (suggestion) {
          showSuggestionPopup(inputElement, suggestion);
        }
      })
    ) {
      return;
    }
  }
});

function showSuggestionPopup(inputElement, suggestion) {
  const oldTooltip = document.querySelector('.suggestion-popup');
  if (oldTooltip) {
    oldTooltip.remove();
  }

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

  popup.addEventListener('mousedown', (event) => {
    event.preventDefault();
    inputElement.value = suggestion;
    popup.remove();
  });

  inputElement.addEventListener('blur', () => {
    if (document.body.contains(popup)) {
      popup.remove();
    }
  }, { once: true });
}
