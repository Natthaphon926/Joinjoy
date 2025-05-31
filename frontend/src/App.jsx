import AppRoutes from "../routes/AppRoutes";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../src/contexts/AuthContext";
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
