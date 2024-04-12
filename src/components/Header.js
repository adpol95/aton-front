import logo from "../assets/images/logo_thin_white.png"
import useSignOut from "react-auth-kit/hooks/useSignOut";
import {useNavigate} from "react-router";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function Header() {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const auth = useAuthUser();
    return (<header className="header" style={{justifyContent: auth ? "space-between" : "center"}}>
        <div className="header__logo">
            <img src={logo} alt="aton-logo"/>
        </div>
        {auth ?
            <div className="header__auth">
                <div>Ответственный: <b>{auth.fullName}</b></div>
                <button onClick={() => {
                    signOut();
                    navigate("/");
                }}>Выйти
                </button>
            </div> : ""

        }

    </header>)
}

export default Header;