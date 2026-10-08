const form = document.getElementById("transactionForm");

const transactionType = document.getElementById("transactionType");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");

const transactionList = document.getElementById("transactionList");

const totalBalance = document.getElementById("totalBalance");
const totalIncome = document.getElementById("totalIncome");
const totalExpenses = document.getElementById("totalExpenses");

const transactionFilter = document.getElementById("transactionFilter");


// =========================
// TRANSACTIONS ARRAY
// =========================

let transactions = [];


// =========================
// FORM SUBMISSION
// =========================

form.addEventListener("submit", function(event) {

    // Stop the page from refreshing
    event.preventDefault();
   //check the a mount is greater than 0
  if (Number(amount.value) <= 0){
    alert("amount should be greater than zero.");
      required;
  }

    // Create a transaction object
    const transaction = {
        id: Date.now(),
        type: transactionType.value,
        description: description.value,
        amount: Number(amount.value),
        category: category.value,
        date: date.value
    };

    // Add transaction to the array
    transactions.push(transaction);

    // Display transactions
    displayTransactions();

    // Update dashboard
    calculateTotals();

    // Clear the form
    form.reset();
});


// =========================
// DISPLAY TRANSACTIONS
// =========================

function displayTransactions() {

    // Clear the old list
    transactionList.innerHTML = "";

    // Get selected filter
    const filter = transactionFilter.value;

    // Filter transactions
    const filteredTransactions = transactions.filter(function(transaction) {

        if (filter === "all") {
            return true;
        }

        return transaction.type === filter;
    });


    // Check if there are no transactions
    if (filteredTransactions.length === 0) {

        transactionList.innerHTML =
            "<p>No transactions found.</p>";

        return;
    }


    // Loop through transactions
    filteredTransactions.forEach(function(transaction) {

        // Create transaction container
        const transactionElement = document.createElement("div");
      transactionElement.classList.add("transaction")

        if (transaction.type === "income") {
    transactionElement.classList.add("income");
} else {
    transactionElement.classList.add("expense");
        }


        // Create information section
        const information = document.createElement("div");

        information.classList.add("transaction-info");


        // Create transaction details
        let sign;
      if(transaction.type === "income"){
        sign = "+";
      }else {
        sign = "-";
      }
        information.innerHTML = `
    <strong>${transaction.description}</strong>
    <span>Category: ${transaction.category}</span>
    <span>Type: ${transaction.type}</span>
    <span>Date: ${transaction.date}</span>
    <span>Amount: KES ${transaction.amount}</span>
`;


        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";


        // Delete transaction
        deleteButton.addEventListener("click", function() {

            deleteTransaction(transaction.id);

        });


        // Add elements to transaction
        transactionElement.appendChild(information);

        transactionElement.appendChild(deleteButton);

        transactionList.appendChild(transactionElement);

    });
}


// =========================
// CALCULATE TOTALS
// =========================

function calculateTotals() {

    let income = 0;
    let expenses = 0;


    // Loop through transactions
    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else if (transaction.type === "expense") {

            expenses += transaction.amount;

        }

    });


    // Calculate balance
    const balance = income - expenses;


    // Display results
    totalIncome.textContent = `KES ${income}`;

    totalExpenses.textContent = `KES ${expenses}`;

    totalBalance.textContent = `KES ${balance}`;
}


// =========================
// DELETE TRANSACTION
// =========================

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {

        return transaction.id !== id;

    });


    // Update page
    displayTransactions();

    calculateTotals();
}


// =========================
// FILTER TRANSACTIONS
// =========================

transactionFilter.addEventListener("change", function() {

    displayTransactions();

});