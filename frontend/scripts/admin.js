const API_BASE_URL = "http://127.0.0.1:8000";

document.addEventListener("DOMContentLoaded", async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        alert("Please log in as an admin.");
        window.location.href = "index.html";
        return;
    }

    try {
        // Fetch all users
        const response = await axios.get(`${API_BASE_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        const users = response.data.users;

        const userTable = document.getElementById("userTable");
        userTable.innerHTML = users.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.total_income || 0}</td>
                <td>${user.total_expense || 0}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editUser('${user.id}')">Edit</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users.");
    }
});

async function editUser(userId) {
    const newUsername = prompt("Enter new username:");
    if (!newUsername) return;

    const authToken = localStorage.getItem("authToken");
    try {
        await axios.put(`${API_BASE_URL}/admin/users/${userId}`, {
            username: newUsername,
        }, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        alert("User updated successfully!");
        location.reload();
    } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user.");
    }
}
