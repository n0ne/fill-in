document.getElementById('infoForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;

  chrome.storage.sync.set({ firstName, lastName, phoneNumber }, () => {
    console.log('Data saved');
  });
});
