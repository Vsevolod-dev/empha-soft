import './scss/app.scss';
import Navbar from "./components/Navbar";
import {ReactElement} from "react";
import AppRouter from "./components/AppRouter";
import {Layout} from "antd";
import {useActions} from "./hoooks/useActions";
import {useCookies} from "react-cookie";

function App(): ReactElement {
    const { setToken } = useActions()
    const [cookies] = useCookies(['token'])
    if (cookies.token !== '') setToken(cookies.token)

    return (
        <Layout>
            <Navbar/>
            <Layout.Content style={{padding: 10}}>
                <AppRouter/>
            </Layout.Content>
        </Layout>
    );
}

export default App;
