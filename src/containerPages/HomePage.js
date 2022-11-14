
import ShowMap from "../components/ShowMap";
import ShowLocations from "../components/ShowLoacations";
import { Grid } from "@mui/material";


export default function HomePage () {

    return(
        <Grid item container xs={12} sx={{height:'100vh',width:'100vw'}} alignItems ='center' alignContent='center' >
            <ShowMap/>
            <ShowLocations/>
        </Grid>
    )
}