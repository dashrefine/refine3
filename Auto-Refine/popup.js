document.addEventListener('DOMContentLoaded', (event) => {
  chrome.storage.local.get(['gender', 'accessories', 'shoes', 'clothing', 'activewear', 'underwear'], function(data) {
    if (data.gender) document.getElementById('gender').value = data.gender;
    if (data.accessories) document.getElementById('accessories').value = data.accessories.join(', ');
    if (data.shoes) document.getElementById('shoes').value = data.shoes.join(', ');
    if (data.clothing) document.getElementById('clothing').value = data.clothing.join(', ');
    if (data.activewear) document.getElementById('activewear').value = data.activewear.join(', ');
    if (data.underwear) document.getElementById('underwear').value = data.underwear.join(', ');
  });
});

document.getElementById('filterForm').addEventListener('submit', (event) => {
  event.preventDefault();

  let gender = document.getElementById('gender').value;
  let accessories = document.getElementById('accessories').value.split(',').map(size => size.trim());
  let shoes = document.getElementById('shoes').value.split(',').map(size => size.trim());
  let clothing = document.getElementById('clothing').value.split(',').map(size => size.trim());
  let activewear = document.getElementById('activewear').value.split(',').map(size => size.trim());
  let underwear = document.getElementById('underwear').value.split(',').map(size => size.trim());

  chrome.storage.local.set({gender, accessories, shoes, clothing, activewear, underwear}, () => {
    console.log('Settings saved');
  });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    });
  });
});





