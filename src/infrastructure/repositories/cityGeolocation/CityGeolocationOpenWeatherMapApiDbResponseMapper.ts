import CityGeolocation from "domain/cityGeolocation/CityGeolocation";
import ICityGeolocationOpenWeatherMapApiDbResponse from "infrastructure/repositories/cityGeolocation/ICityGeolocationOpenWeatherMapApiDbResponse";


export default class CityGeolocationOpenWeatherMapApiDbResponseMapper {
    public static toEntity(cityGeolocationMapper: ICityGeolocationOpenWeatherMapApiDbResponse): CityGeolocation {
        return new CityGeolocation(
            cityGeolocationMapper.name,
            cityGeolocationMapper.state,
            cityGeolocationMapper.country,
            cityGeolocationMapper.lat,
            cityGeolocationMapper.lon,
            cityGeolocationMapper.id,
        );
    }
}
