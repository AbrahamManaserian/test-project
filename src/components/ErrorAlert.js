import { Backdrop, Button, Dialog, Grid, Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import CloseIcon from "./Icons";


export default function ErrorAlert (props) {
    const [openError,setOpenError] = useState(true)
    return(
        <Dialog
        sx={{'& .MuiDialog-paper':{
          width:'600px',
          // height:'172px',
          boxShadow:'0px 4px 32px rgba(0, 0, 0, 0.08)',
          borderRadius:'12px',
          backdropFilter:'blur(14px)'
        }}}
        open={openError}
        onClose={()=>setOpenError(false)}
        BackdropComponent={styled(Backdrop, {
          name: "MuiModal",
          slot: "Backdrop",
          overridesResolver: (props, styles) => {
            return styles.backdrop;
          }
        })({
          zIndex: -1,
          backgroundColor: "rgba(250, 250, 250, 0.8)",
        })}
      >
        <Grid item container xs ={12} p='24px 29px 32px 24px' >
          <Grid item container xs={12} justifyContent='space-between' pb='24px'>
              <Typography variant='h1' >
                  Error
              </Typography>
              <div style={{cursor:'pointer'}} onClick={()=>props.setError(null)}>
                <CloseIcon/>
             </div>
          </Grid>
          <Grid item container xs={12} justifyContent='flex-start' >
              <Typography variant='h3'>
                 Something went wrong try again
              </Typography>
          </Grid>
          <Grid item container xs={12} justifyContent='flex-end' mt='32px'>
              <Button variant="contained" onClick={()=>props.setError(null)}>
                Ok
              </Button>
          </Grid>
          
        </Grid>
      </Dialog>
    )
}