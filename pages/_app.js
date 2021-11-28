import "../styles/globals.css";
import "../styles/nprogress.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Initialize from "../initialize/Initialize";
import Router from "next/router";
import nProgress from "nprogress";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

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
