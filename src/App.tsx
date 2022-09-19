import './scss/app.scss';
import Header from "./components/Header";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <Routes>
                    <Route path={'/'} element={<UserList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
