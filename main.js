// Function to check for the button and trigger the extension logic
function checkForChatButton() {
  // Select the button with title "Open Chat"
  const loadingElement = document.querySelector(
    '.text--detail-header.spinner-loading-message'
  );

  if (!loadingElement) {
    // If the button is found, trigger the desired logic (e.g., clicking the button)
    console.log('Chat button found, triggering the extension logic.');

    // Here, you can trigger your extension logic, e.g., clicking the button
    // loadingElement.click(); // Uncomment if you want to click it
    initializeScrape();
    // Now that the button is found, clear the interval
    clearInterval(intervalId);
  }
}

// Set an interval to check for the button every 500 milliseconds (0.5 seconds)
const intervalId = setInterval(checkForChatButton, 500);

function escapeCSVField(field) {
  // Enclose in double quotes if there are commas, quotes, or newlines
  if (field.includes('"') || field.includes(',') || field.includes('\n')) {
    // Escape double quotes by doubling them
    field = `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

function getCSVLinkElement(arr) {
  const link = document.createElement('a');

  const yourDate = new Date();
  yourDate.toISOString().split('T')[0];
  const offset = yourDate.getTimezoneOffset();
  localDate = new Date(yourDate.getTime() - offset * 60 * 1000)
    .toISOString()
    .split('T')[0];
  link.download = `minted_address_book_${localDate}.csv`;
  link.download = `minted_address_book.csv`;
  link.textContent = 'Save as CSV';
  link.id = 'download-csv-file';
  // Escape all fields in the array
  var csv = arr
    .map(function (row) {
      return row.map(escapeCSVField).join(',');
    })
    .join('\n');

  link.href = encodeURI('data:text/csv,' + csv);

  return link;
}

function initializeScrape() {
  headers = ['Name', 'Address'];
  result = [headers];
  if (confirm('Press OK to scrape addresses.')) {
    allNameNodes = document.querySelectorAll('.addressbook-contact-name');

    allNameNodes.forEach((node) => {
      node.click();
      const addressElement = document.querySelector('address');
      let addressText = addressElement.innerHTML;
      addressText = addressText.replace(/<br\s*\/?>/gi, ' ');

      if (node.textContent) {
        nameAddressTuple = [node.textContent, addressText];
        result.push(nameAddressTuple);
      }
    });
    console.log(result);
    downloadElement = getCSVLinkElement(result);
    downloadElement.click();
  } else {
    console.log('No scraping chosen');
  }
}
