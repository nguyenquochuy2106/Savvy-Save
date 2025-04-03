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
        document.getElementById("statsOverview").textContent = `Income: $${stats.total_income.toFixed(2)} | Expense: $${stats.total_expense.toFixed(2)} | Savings: $${stats.total_savings.toFixed(2)}`;

        // Fetch category breakdown (mocked for now)
        const categoryTable = document.getElementById("categoryTable");
        const categories = [
            { category: "Food", amount: 200 },
            { category: "Transport", amount: 100 },
            { category: "Entertainment", amount: 150 },
        ];
        categoryTable.innerHTML = categories.map(cat => `
            <tr>
                <td>${cat.category}</td>
                <td>$${cat.amount.toFixed(2)}</td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Error fetching stats:", error);
        alert("Failed to load stats.");
    }
});
