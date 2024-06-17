import { injectable } from 'inversify';
import env from '@beam-australia/react-env';
import {checkResp, getRespJson, getUrlWithParams, throwError} from "infrastructure/helpers/Responses";
import CityGeolocation from 'domain/cityGeolocation/CityGeolocation';
import ICityGeolocationRepository from '../../../application/repositories/ICityGeolocationRepository';
import Filter from "domain/filter/Filter";
import CityGeolocationOpenWeatherMapApiDbResponseMapper from "infrastructure/repositories/cityGeolocation/CityGeolocationOpenWeatherMapApiDbResponseMapper";


@injectable()
export default class CityGeolocationOpenWeatherMapApiDbRepository implements ICityGeolocationRepository {
    private static readonly OWM_API_DB_URL: string = env('OWM_API_DB_URL') || 'http://localhost:3000';
    private static readonly OWM_API_KEY: string = env('OWM_API_KEY') || 'repositoryServiceName';
    private static readonly OWM_API_DB_SERVICE: string = env('OWM_API_DB_GEO_NAME') || 'repositoryServiceName';
    private static readonly OWM_API_DB_VERSION: string = env('OWM_API_DB_GEO_VERSION') || 'asd123asd123';
    private static readonly OWM_API_DB_RESOURCE: string = env('OWM_API_DB_GEO_RESOURCE') || 'asd123asd123';

    private readonly api_url: string;
    private readonly headers: Headers;


    constructor() {
        this.api_url = CityGeolocationOpenWeatherMapApiDbRepository.OWM_API_DB_URL;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }


    public async list(filter: Filter, abortSignal?: AbortSignal): Promise<CityGeolocation[]> {

        const apiServiceName = CityGeolocationOpenWeatherMapApiDbRepository.OWM_API_DB_SERVICE;
        const apiServiceVersion = CityGeolocationOpenWeatherMapApiDbRepository.OWM_API_DB_VERSION;
        const apiServiceResource = CityGeolocationOpenWeatherMapApiDbRepository.OWM_API_DB_RESOURCE;
        const appid = CityGeolocationOpenWeatherMapApiDbRepository.OWM_API_KEY;

        const endpoint = new URL(`${this.api_url}/${apiServiceName}/${apiServiceVersion}/${apiServiceResource}`);
        endpoint.searchParams.append("appid", appid);
        endpoint.searchParams.append("q", "Alessandria"); //TODO remove hardCode
        endpoint.searchParams.append("limit", "1"); //TODO remove hardCode
        const queryParams: any = filter.filters;
        const url = getUrlWithParams(endpoint, queryParams);

        const params: RequestInit = {
            method: "GET",
            headers: this.headers,
            signal: abortSignal,
        }

        const response = await fetch(url, params)
            .then((resp) => getRespJson(checkResp(resp)))
            .catch(throwError);

        const cityGeolocations: ICityGeolocationRepository[] = response;

        return cityGeolocations.map(CityGeolocationOpenWeatherMapApiDbResponseMapper.toEntity);
    }
}
