import { Layout } from "antd";
import LoginForm from "../../components/forms/login/LoginForm";
import "./LoginPage.css"


const { Header, Footer, Sider, Content } = Layout;

const LoginPage = () => {
  return (
      <div className="login-form-wrapper">
      <LoginForm />
    </div>


  )
}

export default LoginPage;
