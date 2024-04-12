import {Outlet} from "react-router";
import Header from "./components/Header";
import "./App.css";
import "./assets/styles/loader.css"
import "./assets/styles/auth.css"
import "./assets/styles/clients.css"
import "./assets/styles/header.css"

function App() {
    return (
        <div className="App">
            <Header/>
            <Outlet/>
        </div>
    );
}

export default App;
