import LoginForm from "../../components/forms/login/LoginForm";
import LoginRegisterHeader from "../../components/headers/loginRegister/LoginRegistrer";
import "./LoginPage.css"

const LoginPage = () => {
  return (
    <>
      <LoginRegisterHeader />
      <div className="login-form-wrapper">
        <LoginForm />
      </div>
    </>
  )
}

export default LoginPage;