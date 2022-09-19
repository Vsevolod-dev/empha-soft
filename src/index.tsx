import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import {CookiesProvider} from "react-cookie";

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <CookiesProvider>
                <App/>
            </CookiesProvider>
        </BrowserRouter>
    </Provider>
);
