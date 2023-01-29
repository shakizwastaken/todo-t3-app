import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { ModalProvider } from "../context/modal";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ModalProvider>
        <div className="app_wrapper">
          <Component {...pageProps} />
        </div>
      </ModalProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
