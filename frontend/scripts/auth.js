import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://wvattyjoisrgyrxpchkp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2YXR0eWpvaXNyZ3lyeHBjaGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxODQ2ODIsImV4cCI6MjA1Nzc2MDY4Mn0.aWXzjyDjtHipzsraG84d79Le7dPrQ9QEwZY2Ua9eqa4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;

                alert("Login successful!");
                console.log(data);

                // Store the authentication token in localStorage
                localStorage.setItem("authToken", data.session.access_token);

                // Redirect based on role
                const userRole = data.user.role; // Assume role is returned
                if (userRole === "admin") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "dashboard.html";
                }
            } catch (error) {
                alert("Login failed: " + error.message);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const { data, error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;

                alert("Registration successful!");
                console.log(data);

                // Redirect to login
                window.location.href = "index.html";
            } catch (error) {
                alert("Registration failed: " + error.message);
            }
        });
    }
});
