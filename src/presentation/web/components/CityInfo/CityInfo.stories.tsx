import React from 'react';
import CityInfo from "./CityInfo";

export default {
    title: "Components/Presentation/CityInfo",
    component: CityInfo,
}

export const Basic = () => (
    <CityInfo
        city={`Alessandria`}
        state={`Alessandria`}
        region={`Piemonte`}
        country={`Italia`}
    />
)