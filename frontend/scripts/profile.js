const API_BASE_URL = "http://127.0.0.1:8000";

document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId"); // Assume userId is stored after login
    if (!userId) {
        alert("Please log in first.");
        window.location.href = "index.html";
        return;
    }

    const profileForm = document.getElementById("profileForm");

    // Fetch and display user profile
    async function loadProfile() {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/profile`, { params: { user_id: userId } });
            const user = response.data.user;
            document.getElementById("username").value = user.username;
            document.getElementById("email").value = user.email;
            document.getElementById("description").value = user.description || "";
        } catch (error) {
            console.error("Error fetching profile:", error);
            alert("Failed to load profile.");
        }
    }

    // Update user profile
    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const description = document.getElementById("description").value;

        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("username", username);
        formData.append("description", description);

        try {
            await axios.put(`${API_BASE_URL}/auth/profile`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Profile updated successfully!");
            loadProfile(); // Reload profile after update
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    });

    // Initial load
    loadProfile();
});
