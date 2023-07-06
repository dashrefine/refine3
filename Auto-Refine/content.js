function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clickButtonByText(buttonText) {
  let buttons = Array.from(document.querySelectorAll('button'));
  for (let button of buttons) {
    if (button.textContent.trim().includes(buttonText)) {
      button.click();
      console.log(`Clicked ${buttonText} button`);
      break;
    }
  }
}

function clickButton() {
  let button = document.querySelector('button[data-testid="view-results-button"]');
  if(button) {
    button.click();
    console.log('Clicked "Show Results" button');
  }
}

async function processSteps(steps) {
  for (let step of steps) {
    if (step.text) {
      clickButtonByText(step.text);
    }
    await delay(1000);
  }
  clickButton(); // Click the "Show Results" button last
}

async function run() {
  chrome.storage.local.get(['gender', 'accessories', 'shoes', 'clothing', 'activewear', 'underwear'], function(result) {
    let steps = [
      { text: "Filter" }, // or "All Filters"
      {text: "Size"},
      { text: result.gender },
      { text: "Accessories" },
      ...result.accessories.map(size => ({ text: size })),
      { text: "Shoes" },
      ...result.shoes.map(size => ({ text: size })),
      { text: "Clothing" },
      ...result.clothing.map(size => ({ text: size })),
      { text: "Activewear" },
      ...result.activewear.map(size => ({ text: size })),
      { text: "Underwear & Socks" },
      ...result.underwear.map(size => ({ text: size })),
      { text: "Apply" },
    ];
    processSteps(steps);
  });
}

run();
