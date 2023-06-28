import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import styles from "@/styles/Home.module.scss";
import { StoreProvider } from "../contexts/store/store";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StoreProvider>
            <main className={`${styles.main}`}>
                <Component {...pageProps} />
            </main>
        </StoreProvider>
    );
}
