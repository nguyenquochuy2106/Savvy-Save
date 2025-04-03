const API_BASE_URL = "http://127.0.0.1:8000";

document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId"); // Assume userId is stored after login
    if (!userId) {
        alert("Please log in first.");
        window.location.href = "index.html";
        return;
    }

    const transactionForm = document.getElementById("transactionForm");
    const transactionTable = document.getElementById("transactionTable");

    // Fetch and display transactions
    async function loadTransactions() {
        try {
            const authToken = localStorage.getItem("authToken");
            const response = await axios.get(`${API_BASE_URL}/transactions`, {
                headers: { Authorization: `Bearer ${authToken}` },
                params: { user_id: userId },
            });
            const transactions = response.data.transactions;
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
            console.error("Error fetching transactions:", error);
            alert("Failed to load transactions.");
        }
    }

    // Add a new transaction
    transactionForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("authToken");
        const date = document.getElementById("date").value;
        const category = document.getElementById("category").value;
        const type = document.getElementById("type").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const note = document.getElementById("note").value;

        try {
            await axios.post(`${API_BASE_URL}/transactions`, {
                id: crypto.randomUUID(),
                user_id: userId,
                date,
                category,
                transaction_type: type,
                amount,
                note,
            }, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            alert("Transaction added successfully!");
            transactionForm.reset();
            loadTransactions();
        } catch (error) {
            console.error("Error adding transaction:", error);
            alert("Failed to add transaction.");
        }
    });

    // Initial load
    loadTransactions();
});
