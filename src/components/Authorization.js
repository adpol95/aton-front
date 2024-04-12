import {useState} from "react";
import {useNavigate} from "react-router";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {Link} from "react-router-dom";

function Authorization() {
    const [loginIn, setLoginIn] = useState('');
    const [passwordIn, setPasswordIn] = useState('');
    const signIn = useSignIn();
    const navigate = useNavigate();

    const submiter = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_STATE1 + "/authorization/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({userName: loginIn, password: passwordIn}), // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(response => {
                if (signIn({
                    auth: {
                        token: response.token,
                        type: 'Bearer',
                    },
                    // refresh: response.refToken,
                    userState: response.profile
                })) {
                    alert("Приветствуем вас " + response.profile.fullName + "!")
                    navigate("/clients");
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something goes wrong. Try again later")
            })
    }
    return (
        <div className="auth">
            <h2>Авторизация</h2>
            <form onSubmit={submiter} className="auth__form">
                <div className="auth__container">
                    <div className="auth__nick">
                        <label>
                            <input
                                type="text"
                                value={loginIn}
                                onChange={(event) => setLoginIn(event.target.value)}
                                placeholder="Логин"
                            />
                        </label>
                    </div>
                    <div className="auth__password">
                        <label>
                            <input
                                type="password"
                                value={passwordIn}
                                onChange={(event) => setPasswordIn(event.target.value)}
                                placeholder="Пароль"
                            />
                        </label>
                    </div>
                </div>
                <button type="submit" className="auth__accept-btn">
                    Войти
                </button>
            </form>
        </div>
    )
}

export default Authorization;