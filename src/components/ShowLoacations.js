import { Backdrop, Button, Dialog, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "./Icons";
import ErrorAlert from "./ErrorAlert";

export default function ShowLocations () {
    const [openLocations,setOpenLocations] = useState(false)
    const [error, setError] = useState(null)
    const [locations, setLocations] = useState([])
    useEffect(()=>{
        if(openLocations) {
            async function getLocation () {
                try{
                    let url = 'https://dev-sso.transparenterra.com/api/location-list'
                    const resIp = await axios.get('https://geolocation-db.com/json/')
                    const response = await fetch(url)
                    if(response.ok) {
                        const json = await response.json()
                        setLocations(json.data.filter(item=>item.ip===resIp.data.IPv4))
                    }else{
                        setOpenLocations(false)
                        setError('error')
                    }
                   
                }catch(error){
                    setOpenLocations(false)
                    setError('error')
                    console.log(error)
                }
            }
            getLocation()
        }
    },[openLocations])
    
    return(
        <Grid item container xs={12} justifyContent='center'>
              <Button variant="outlined" onClick={(e)=>setOpenLocations(true)} >
                  show locations
              </Button>
              {error && <ErrorAlert setError={setError} />}
              <Dialog
                  sx={{'& .MuiDialog-paper':{
                    width:'600px',
                    // height:'172px',
                    boxShadow:'0px 4px 32px rgba(0, 0, 0, 0.08)',
                    borderRadius:'12px',
                    backdropFilter:'blur(14px)'
                  }}}
                  open={openLocations}
                  onClose={()=>setOpenLocations(false)}
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
                        <Typography variant='h1'>
                            List of locations
                        </Typography>
                        <div style={{cursor:'pointer'}} onClick={()=>setOpenLocations(false)}>
                          <CloseIcon/>
                       </div>
                    </Grid>
                    <Grid item container xs={4} justifyContent='flex-start'>
                        <Typography variant='h2'>
                            Ip
                        </Typography>
                    </Grid>
                    <Grid item container xs={4} justifyContent='flex-start'>
                        <Typography variant='h2'>
                            Coord_x
                        </Typography>
                    </Grid>
                    <Grid item container xs={4} justifyContent='flex-start'>
                        <Typography variant='h2'>
                             Coord_y
                        </Typography>
                    </Grid>
                    {locations.map((item)=>{

                        return (
                            <Grid item container xs={12}  key={item.id} pt='16px'>
                               <Grid  item container xs={4} justifyContent='flex-start'>
                                   <Typography variant='h3'>
                                        {item.ip}
                                   </Typography>
                               </Grid>
                               <Grid  item container xs={4} justifyContent='flex-start'>
                                   <Typography variant='h3'>
                                      {item.coord_x}
                                   </Typography>
                               </Grid>
                               <Grid  item container xs={4} justifyContent='flex-start'>
                                   <Typography variant='h3'>
                                      {item.coord_y}
                                   </Typography>
                               </Grid>
                            </Grid>
                        )
                    })}
             
                  </Grid>
              </Dialog>
        </Grid>
    )
}