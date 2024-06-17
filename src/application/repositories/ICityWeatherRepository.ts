import Filter from "domain/filter/Filter";
import CityWeather from "domain/cityWeather/CityWeather";


export default interface ICityWeatherRepository {
    read(filter: Filter, abortSignal?: AbortSignal): Promise<CityWeather>;
}
