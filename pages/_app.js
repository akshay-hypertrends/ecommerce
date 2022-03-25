import React, { createRef, useEffect } from "react";
import Layout from "@components/Layouts";
import "../styles/globals.css";
import CartContext from "@services/CartContext";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "@components/Notification";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { QueryClient, QueryClientProvider } from "react-query";
import "animate.css";

function MyApp({ Component, pageProps }) {
  const notistackRef = createRef();
  const queryClient = new QueryClient();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CartContext>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          preventDuplicate
          autoHideDuration={5000}
          ref={notistackRef}
          action={(key) => (
            <IconButton
              style={{ color: "white" }}
              onClick={onClickDismiss(key)}
            >
              <Close />
            </IconButton>
          )}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <SnackbarUtilsConfigurator />
        </SnackbarProvider>
      </CartContext>
    </QueryClientProvider>
  );
}

export default MyApp;
