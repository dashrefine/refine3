chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'filterProducts') {
    const { topSize, bottomSize, shoeSize } = request.selectedSizes;

    try {
      $('.product').each(function () {
        const productTopSize = $(this).data('top-size');
        const productBottomSize = $(this).data('bottom-size');
        const productShoeSize = $(this).data('shoe-size');

        const topSizeMatch = !topSize || topSize === productTopSize;
        const bottomSizeMatch = !bottomSize || bottomSize === productBottomSize;
        const shoeSizeMatch = !shoeSize || shoeSize === productShoeSize;

        if (topSizeMatch && bottomSizeMatch && shoeSizeMatch) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
      sendResponse({ success: true });
    } catch (error) {
      sendResponse({ success: false, error: 'An error occurred while filtering the products.' });
    }
  }
});