const API_BASE_URL = "http://127.0.0.1:8000";

document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId"); // Assume userId is stored after login
    if (!userId) {
        alert("Please log in first.");
        window.location.href = "index.html";
        return;
    }

    try {
        // Fetch stats
        const statsResponse = await axios.get(`${API_BASE_URL}/stats`, { params: { user_id: userId } });
        const stats = statsResponse.data.stats;
        document.getElementById("balance").textContent = `$${(stats.total_income - stats.total_expense).toFixed(2)}`;
        document.getElementById("stats").textContent = `Income: $${stats.total_income.toFixed(2)} | Expense: $${stats.total_expense.toFixed(2)}`;

        // Fetch transactions
        const transactionsResponse = await axios.get(`${API_BASE_URL}/transactions`, { params: { user_id: userId } });
        const transactions = transactionsResponse.data.transactions;
        const transactionTable = document.getElementById("transactionTable");
        transactionTable.innerHTML = transactions.map(transaction => `
            <tr>
                <td>${transaction.id}</td>
                <td>${transaction.date}</td>
                <td>${transaction.category}</td>
                <td>${transaction.transaction_type}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
                <td>${transaction.note}</td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("Failed to load dashboard data.");
    }
});
