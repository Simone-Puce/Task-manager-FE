import RegisterForm from "../../components/forms/register/RegisterForm";
import LoginRegisterHeader from "../../components/headers/loginRegistration/LoginRegistrer";
import "./RegisterPage.css"

const RegisterPage = () => {
  return (
    <>
      <LoginRegisterHeader />
      <div className="register-form-wrapper">
        <RegisterForm />
      </div>
    </>
  )
}

export default RegisterPage;
