import { injectable } from 'inversify';
import env from '@beam-australia/react-env';
// import { checkResp, getRespJson, throwError } from 'infrastructure/helpers/Responses';
import ICityWeatherRepository from '../../../application/repositories/ICityWeatherRepository';
import CityWeather from 'domain/cityWeather/CityWeather';
import Filter from "domain/filter/Filter";
import {checkResp, getRespJson, throwError} from "../../helpers/Responses";


@injectable()
export default class CityWeatherOpenWeatherMapApiDbRepository implements ICityWeatherRepository {
    private static readonly OWM_API_DB_URL: string = env('OWM_API_DB_URL') || 'http://localhost:3000';
    private static readonly OWM_API_KEY: string = env('OWM_API_KEY') || 'asd123asd123';
    private static readonly OWM_API_DB_DATA_SERVICE: string = env('OWM_API_DB_DATA_SERVICE') || 'service';
    private static readonly OWM_API_DB_DATA_VERSION: string = env('OWM_API_DB_DATA_VERSION') || 'key123key123';
    private static readonly OWM_API_DB_DATA_RESOURCE: string = env('OWM_API_DB_DATA_RESOURCE') || 'resource';

    private readonly api_url: string;
    private readonly headers: Headers;


    constructor() {
        this.api_url = CityWeatherOpenWeatherMapApiDbRepository.OWM_API_DB_URL;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }


    public async list(filter: Filter, abortSignal?: AbortSignal): Promise<CityWeather[]> {

        const apiServiceName = CityWeatherOpenWeatherMapApiDbRepository.OWM_API_DB_DATA_SERVICE;
        const apiServiceVersion = CityWeatherOpenWeatherMapApiDbRepository.OWM_API_DB_DATA_VERSION;
        const apiServiceResource = CityWeatherOpenWeatherMapApiDbRepository.OWM_API_DB_DATA_RESOURCE;
        const appid = CityWeatherOpenWeatherMapApiDbRepository.OWM_API_KEY;

        const endpoint = new URL(`${this.api_url}/${apiServiceName}/${apiServiceVersion}/${apiServiceResource}`);
        endpoint.searchParams.append("appid", appid);
        endpoint.searchParams.append("lat", "44.9129069"); //TODO remove hardCode
        endpoint.searchParams.append("lon", "8.6153899"); //TODO remove hardCode
        endpoint.searchParams.append("lang", "en"); //TODO remove hardCode
        const filtersAny: any = filter.filters;
        Object.keys(filtersAny).forEach(key => {
            const hasKey = filtersAny[key] !== undefined && filtersAny[key] !== "";
            if (hasKey) endpoint.searchParams.append(key, String(filtersAny[key]));
        });


        const params: RequestInit = {
            method: "GET",
            headers: this.headers,
            signal: abortSignal,
        }

        const carriersResponse = await fetch(endpoint, params)
            .then((resp) => getRespJson(checkResp(resp)))
            .catch(throwError);

        const carriers: ICarrierOpenWeatherMapApiDbResponse[] = carriersResponse;

        return carriers.map(CarrierOpenWeatherMapApiDbMapper.toEntity);
    }
}
