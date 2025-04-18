import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/Navbar";

const Login = () => {
  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};

export default Login;
