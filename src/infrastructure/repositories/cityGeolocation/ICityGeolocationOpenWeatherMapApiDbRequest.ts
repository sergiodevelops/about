export default interface ICityGeolocationOpenWeatherMapApiDbRequest {
    name: string,
    state: string,
    country: string,
    lat: number,
    lon: number,
    id?: number,
}
