import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import styles from "@/styles/Home.module.scss";
import { StoreProvider } from "../contexts/store/store";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StoreProvider>
            <main className="main">
                <Component {...pageProps} />

                <ToastContainer
                    {...{
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    }}
                />
            </main>
        </StoreProvider>
    );
}
