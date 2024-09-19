"use client"
import { AuthProvider } from "../components/auth/authContext";
import Home from "../app/home";

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;