import { injectable } from 'inversify';
import env from '@beam-australia/react-env';
import { checkResp, getRespJson, throwError } from 'infraestructure/helpers/Responses';
import Authentication from 'infraestructure/repositories/authentication/Authentication';
import ICityGeolocation from 'application/repositories/ICityGeolocation';
import CityGeolocation from 'domain/cityGeolocation/CityGeolocation';

@injectable()
export default class CityGeolocationOpenWeatherMapApiDBRepository extends Authentication implements ICityGeolocation {
    private static readonly ZOOM_API_DB_LOCAL_URL: string = env('GATEWAY_URL') || 'http://localhost:9999';
    private static readonly ZOOM_API_DB_LOCAL_RESOURCE: string = 'cityGeolocation';

    private readonly api_url: string;
    private readonly headers: Headers;

    constructor() {
        super();
        this.api_url = CityGeolocationOpenWeatherMapApiDBRepository.ZOOM_API_DB_LOCAL_URL;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }
}
