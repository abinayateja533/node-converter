const readline = require('readline');

// Hardcoded exchange rates for USD to INR and INR to USD
const exchangeRates = {
  USD_TO_INR: 75.50,
  INR_TO_USD: 1 / 75.50  // 1 INR = 1/75.50 USD
};

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to handle the currency conversion logic
function convertCurrency(amount, fromCurrency, toCurrency) {
  let conversionRate;

  // Determine the conversion rate based on the input currencies
  if (fromCurrency === 'USD' && toCurrency === 'INR') {
    conversionRate = exchangeRates.USD_TO_INR;
  } else if (fromCurrency === 'INR' && toCurrency === 'USD') {
    conversionRate = exchangeRates.INR_TO_USD;
  } else {
    console.log('Invalid currency pair. This converter only supports USD to INR and INR to USD.');
    return;
  }

  // Calculate the converted amount
  const convertedAmount = (amount * conversionRate).toFixed(2);
  console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`);
}

// Function to ask user for inputs and perform conversions
function askQuestions() {
  rl.question('Enter the amount (or type "exit" to quit): ', (amount) => {
    if (amount.toLowerCase() === 'exit') {
      console.log('Exiting the currency converter. Goodbye!');
      rl.close();
      return; // Exit the program if the user types 'exit'
    }

    // Validate if the input is a valid number
    if (isNaN(amount) || amount <= 0) {
      console.log('Please enter a valid positive number for the amount.');
      return askQuestions(); // Prompt again if invalid input
    }

    rl.question('Enter the source currency (USD or INR): ', (fromCurrency) => {
      fromCurrency = fromCurrency.toUpperCase();
      if (fromCurrency !== 'USD' && fromCurrency !== 'INR') {
        console.log('Invalid source currency. Please enter either "USD" or "INR".');
        return askQuestions(); // Prompt again for valid source currency
      }

      rl.question('Enter the target currency (USD or INR): ', (toCurrency) => {
        toCurrency = toCurrency.toUpperCase();
        if (toCurrency !== 'USD' && toCurrency !== 'INR') {
          console.log('Invalid target currency. Please enter either "USD" or "INR".');
          return askQuestions(); // Prompt again for valid target currency
        }

        // Perform the currency conversion
        convertCurrency(parseFloat(amount), fromCurrency, toCurrency);

        // After conversion, prompt again for next input
        askQuestions();
      });
    });
  });
}

// Start asking questions and perform conversions
askQuestions();
