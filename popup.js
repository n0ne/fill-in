document.addEventListener('DOMContentLoaded', () => {
  // Загрузка сохраненных данных при открытии popup
  chrome.storage.sync.get(['firstName', 'lastName', 'email', 'phoneNumber'], (data) => {
    if (data.firstName) document.getElementById('firstName').value = data.firstName;
    if (data.lastName) document.getElementById('lastName').value = data.lastName;
    if (data.email) document.getElementById('email').value = data.email;
    if (data.phoneNumber) document.getElementById('phoneNumber').value = data.phoneNumber;
  });

  document.getElementById('infoForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    chrome.storage.sync.set({ firstName, lastName, email, phoneNumber }, () => {
      console.log('Data saved');
      window.close();
    });
  });
});
