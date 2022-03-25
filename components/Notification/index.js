import React from "react";
import { useSnackbar } from "notistack";
import { Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import route from "next/router";

function InnerSnackbarUtilsConfigurator(props) {
  const { setUseSnackbarRef } = props;
  setUseSnackbarRef(useSnackbar());
  return null;
}

let useSnackbarRef;
const setUseSnackbarRef = (useSnackbarRefProp) => {
  useSnackbarRef = useSnackbarRefProp;
};

export function SnackbarUtilsConfigurator() {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
  );
}

export const snackActions = {
  success(msg) {
    this.toast(msg, "success");
  },
  warning(msg) {
    this.toast(msg, "warning");
  },
  info(msg) {
    this.toast(msg, "info");
  },
  error(msg) {
    this.toast(msg, "error");
  },
  toast(msg, variant = "default",type=null,ticket=null) {
    if(type=='ticket' && ticket)
    {
      var action = this.action(ticket);
    }
    else
    {
      var action = null;
    }
    useSnackbarRef.enqueueSnackbar(msg, { variant,action });
  },
  action(ticket,key) {
    return <>
      {/* <Link href={`/tickets/view/${ticket.id}`}> */}
        <Button style={{color:'white',marginRight: '5px'}} color="error" onClick={() => { viewTicket(ticket.id,useSnackbarRef,key) }}>
          View Ticket
        </Button>
      {/* </Link> */}
      <IconButton style={{color:'white'}} onClick={() => { useSnackbarRef.closeSnackbar(key) }}>
        <Close />
      </IconButton>
    </>
  }
};

function viewTicket(id,useSnackbarRef,key)
{
  // const route = useRouter();
  route.push(`/tickets/view/${id}`);
  useSnackbarRef.closeSnackbar(key);
}