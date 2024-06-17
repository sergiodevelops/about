import Filter from "domain/filter/Filter";
import CityGeolocation from "domain/cityGeolocation/CityGeolocation";


export default interface ICityGeolocationRepository {
    findOne(filter: Filter, abortSignal?: AbortSignal): Promise<CityGeolocation[]>;
}
