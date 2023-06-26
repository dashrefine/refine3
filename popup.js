document.addEventListener("DOMContentLoaded", () => {
  const topSizeDropdown = document.getElementById("topSizeDropdown");
  const bottomSizeDropdown = document.getElementById("bottomSizeDropdown");
  const shoeSizeDropdown = document.getElementById("shoeSizeDropdown");
  const filterButton = document.getElementById("filterButton");
  const errorMessage = document.getElementById("errorMessage");

  filterButton.addEventListener("click", () => {
    const selectedSizes = {
      topSize: topSizeDropdown.value,
      bottomSize: bottomSizeDropdown.value,
      shoeSize: shoeSizeDropdown.value,
    };

    if (!selectedSizes.topSize || !selectedSizes.bottomSize || !selectedSizes.shoeSize) {
      displayError("Please select a size for all categories.");
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "filterProducts", data: selectedSizes }, (response) => {
        if (response && response.type === "filterError") {
          displayError(response.message);
        }
      });
    });
  });

  function displayError(message) {
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 3000);
  }
});