import Footer from "../../components/Footer";
import LoginForm from "../../components/LoginForm";
import NavBar from "../../components/Navbar";
import { AuthProvider } from "../../context/AuthContext";

const Login = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
      </AuthProvider>

      <div className="flex justify-center">
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};

export default Login;
