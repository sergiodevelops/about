import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "constants/types";


import ICityGeolocationRepository from "application/repositories/ICityGeolocationRepository";
import ICityWeatherRepository from "application/repositories/ICityWeatherRepository";

import CityGeolocationService from "configuration/usecases/CityGeolocationService";
import CityWeatherService from "configuration/usecases/CityWeatherService";

import CityGeolocationOpenWeatherMapApiDbRepository from "infrastructure/repositories/cityGeolocation/CityGeolocationOpenWeatherMapApiDbRepository";
import CityWeatherOpenWeatherMapApiDbRepository from "infrastructure/repositories/cityWeather/CityWeatherOpenWeatherMapApiDbRepository";


const container = new Container();


container.bind<ICityGeolocationRepository>(TYPES.ICityGeolocationRepository).to(CityGeolocationOpenWeatherMapApiDbRepository);
container.bind<CityGeolocationService>(TYPES.CityGeolocationService).to(CityGeolocationService);

container.bind<ICityWeatherRepository>(TYPES.ICityWeatherRepository).to(CityWeatherOpenWeatherMapApiDbRepository);
container.bind<CityWeatherService>(TYPES.CityWeatherService).to(CityWeatherService);


container.resolve(CityGeolocationService);
container.resolve(CityWeatherService);


export { container }
