import {Outlet} from "react-router";
import Header from "./components/Header";
import "./assets/styles/loader.css"

function App() {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default App;
