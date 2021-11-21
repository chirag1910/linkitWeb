import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Initialize from "../initialize/Initialize";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Initialize>
                <Component {...pageProps} />
            </Initialize>
        </Provider>
    );
}

export default MyApp;
