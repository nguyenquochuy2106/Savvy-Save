from supabase import create_client

SUPABASE_URL = "https://wvattyjoisrgyrxpchkp.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2YXR0eWpvaXNyZ3lyeHBjaGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxODQ2ODIsImV4cCI6MjA1Nzc2MDY4Mn0.aWXzjyDjtHipzsraG84d79Le7dPrQ9QEwZY2Ua9eqa4"  # Replace with your actual Supabase API key

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
