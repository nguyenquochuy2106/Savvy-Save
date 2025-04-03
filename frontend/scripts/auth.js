const API_BASE_URL = "https://wvattyjoisrgyrxpchkp.supabase.co/auth";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
                alert("Login successful!");
                console.log(response.data);
                // Redirect to dashboard
                window.location.href = "dashboard.html";
            } catch (error) {
                alert("Login failed: " + error.response.data.detail);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const profileImage = document.getElementById("profileImage").files[0];

            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            if (profileImage) {
                formData.append("profile_image", profileImage);
            }

            try {
                const response = await axios.post(`${API_BASE_URL}/register`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Registration successful!");
                console.log(response.data);
                // Redirect to login
                window.location.href = "index.html";
            } catch (error) {
                alert("Registration failed: " + error.response.data.detail);
            }
        });
    }
});
