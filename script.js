// Sample expenses array to hold the added expenses
let expenses = [];

// Function to add an expense
document.getElementById('add-btn').addEventListener('click', function() {
    const category = document.getElementById('category-select').value;
    const amount = parseFloat(document.getElementById('amount-input').value);
    const date = document.getElementById('date-input').value;

    if (!isNaN(amount) && amount > 0 && date) {
        // Add the expense to the array
        expenses.push({ category, amount, date });
        
        // Update the expenses list in the table
        updateExpensesTable();
        updateTotalAmount();
        
        // Clear input fields after adding
        document.getElementById('amount-input').value = '';
        document.getElementById('date-input').value = '';
    } else {
        alert("Please enter valid values.");
    }
});

// Function to update the expenses table
function updateExpensesTable() {
    const tbody = document.getElementById('expnese-table-body');
    tbody.innerHTML = ''; // Clear existing rows

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    // Add delete functionality
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            expenses.splice(index, 1); // Remove the expense from the array
            updateExpensesTable(); // Update the table
            updateTotalAmount(); // Update the total
        });
    });
}

// Function to update the total amount
function updateTotalAmount() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total-amount').textContent = total.toFixed(2);
}

// View Summary Button Functionality
document.getElementById('summary-btn').addEventListener('click', function() {
    if (expenses.length === 0) {
        alert("No expenses to summarize.");
        return;
    }

    const summary = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    let summaryMessage = "Expenses Summary:\n";
    for (const [category, total] of Object.entries(summary)) {
        summaryMessage += `${category}: $${total.toFixed(2)}\n`;
    }
    alert(summaryMessage);
});

// Real-time clock function
function updateClock() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    document.getElementById('clock').textContent = now.toLocaleTimeString(undefined, options);
}
setInterval(updateClock, 1000);
updateClock(); // Initial call

