import ICityGeolocationDto from "application/usecases/cityGeolocation/ICityGeolocationDto";
import ICityGeolocationOpenWeatherMapApiDbRequest from "infrastructure/repositories/cityGeolocation/ICityGeolocationOpenWeatherMapApiDbRequest";


export default class CityGeolocationOpenWeatherMapApiDbRequestMapper {
    public static toObject(cityGeolocation: ICityGeolocationDto): ICityGeolocationOpenWeatherMapApiDbRequest {
        const {name, state, country, lat, lon, id} = cityGeolocation;

        return {name, state, country, lat, lon, id};
    }
}
