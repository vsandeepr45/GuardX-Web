import LoginForm from "../components/Auth/LoginForm";

function Login() {

    return (

        <div className="auth-container">

            <div className="auth-card">

                <div className="auth-logo">

                    🛡️ GuardX

                </div>

                <div className="auth-title">

                    Security ERP

                </div>

                <div className="auth-subtitle">

                    Welcome Back

                </div>

                <LoginForm />

            </div>

        </div>

    );

}

export default Login;