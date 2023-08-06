document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseDescription = document.getElementById('expense-description');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseCategory = document.getElementById('expense-category');
    const expenseList = document.getElementById('expense-list');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(function (expense, index) {
            const expenseItem = document.createElement('div');
            expenseItem.className = 'expense-item';
            expenseItem.innerHTML = `
                <span>${expense.description}: ${expense.amount} (${expense.category})</span>
                <button class="btn btn-danger delete-button" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
        });
    }

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const description = expenseDescription.value;
        const amount = parseFloat(expenseAmount.value);
        const category = expenseCategory.value;

        if (description && !isNaN(amount) && category) {
            expenses.push({ description, amount, category });
            displayExpenses();
            saveExpenses();
            expenseDescription.value = '';
            expenseAmount.value = '';
            expenseCategory.value = '';
        }
    });

    expenseList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            expenses.splice(index, 1);
            displayExpenses();
            saveExpenses();
        }
    });

    displayExpenses();
});

}