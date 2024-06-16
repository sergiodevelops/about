import React from 'react';
import Typography from "@mui/material/Typography";


type CityInfoProps = {
    city: string,
    state: string,
    region: string,
    country: string,
}


const CityInfo = ({city, state, region, country}: CityInfoProps) => {

    return (
        <>
            <Typography fontSize={"1.2rem"} fontWeight={"bolder"} variant="body1">{city}</Typography>
            <Typography fontWeight={"bolder"} variant="body2">{state}</Typography>
            <Typography variant="body2">{region}</Typography>
            <Typography variant="body2">{country}</Typography>
        </>
    );
};

export default CityInfo;