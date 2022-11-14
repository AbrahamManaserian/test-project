import { Backdrop, Button, Dialog, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer,} from "react-leaflet";
import styled from "styled-components";
import CloseIcon from './Icons'
import ErrorAlert from "./ErrorAlert";

const center = {
  lat: 40.18018485291529,
  lng: 44.513511657714844,
}

export default function ShowMap () {
    const [position, setPosition] = useState(center)
    const [error,setError] = useState(null)
    const [openMap,setOpenMap] = useState(false)
    const [userIp, setUserIp] = useState(null)
    useEffect(()=>{
      async function getUserIp () {
          try{
              const res = await axios.get('https://geolocation-db.com/json/')
              setUserIp(res.data.IPv4);  

          }catch(error){
              console.log(error)
              setError(error)
          }

      }
      getUserIp()
    },[])
    async function handleSaveClick () {
        const data = {
          ip:userIp,
          coord_x:position.lat,
          coord_y:position.lng
        }
        try{
          const url = `https://dev-sso.transparenterra.com/api/save-location`
          const response = await fetch(url,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            
          })
          if(!response.ok) setError('error')
          setOpenMap(false)
          
        }catch(error){
          console.log(error)
          setOpenMap(false)
          setError(error)
        }
    }

    function MarkerPosition () {
       
       const markerRef = useRef(null)
       const eventHandlers = useMemo(
         () => ({
           dragend() {
             const marker = markerRef.current
             if (marker != null) {
               setPosition(marker.getLatLng())
             }
           },
         }),
         [],
       )
      
       return (
           <Marker
             draggable={true}
             eventHandlers={eventHandlers}
             position={position}
             ref={markerRef} />
         
       )
    }
    
   
    return(
        <Grid item container xs={12} justifyContent='center'  >
        <Button variant="contained" sx={{mb:'20px'}} onClick={(e)=>setOpenMap(true)} >
            Open map
        </Button>
        {error && <ErrorAlert setError={setError}/> }
        <Dialog
           sx={{m:'72px','& .MuiDialog-paper':{
             maxWidth:'1068px',
             maxHeight:'736px',
             boxShadow:'0px 4px 32px rgba(0, 0, 0, 0.08)',
             borderRadius:'16px',
             backdropFilter:'blur(14px)'
           }}}
           fullScreen={true}
           maxWidth='md'
           open={openMap}
           onClose={()=>setOpenMap(false)}
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
         <Grid item container xs ={12} alignContent='flex-start'>
            <Grid item container xs={12} padding='24px' justifyContent='space-between'>
                <Typography variant="h1"  >
                   List of locations
                </Typography>
                <div style={{cursor:'pointer'}} onClick={()=>setOpenMap(false)}>
                   <CloseIcon/>
                </div>
             </Grid>  
             <Grid item container xs ={12} flexGrow={1} justifyContent='center' p='20px 44px 32px 44px' sx={{height:'100%',maxHeight:'450px'}} >
                
                 <MapContainer style={{height:'100%',width:'100%',borderRadius:'16px',}}
                    center={center}
                    zoom={13}
                    scrollWheelZoom={false}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerPosition />
                  </MapContainer>,
              </Grid>
              <Grid item container xs ={12} justifyContent='flex-end' m='0 24px 32px 0' >
                  <Button variant='contained' onClick={handleSaveClick} autoFocus>
                    save
                  </Button>
              </Grid>
           </Grid>
        </Dialog>
     </Grid>
    )
}