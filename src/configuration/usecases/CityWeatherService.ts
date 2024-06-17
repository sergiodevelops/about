import { injectable, inject } from "inversify";
import { TYPES } from 'constants/types';
import ICityWeatherRepository from "application/repositories/ICityWeatherRepository";
import CityWeatherReadUseCase from "application/usecases/cityWeather/read/CityWeatherReadUseCase";


@injectable()
export default class CityWeatherService {
    @inject(TYPES.ICityWeatherRepository)
    private cityWeatherRepository: ICityWeatherRepository;

    public getCityWeatherReadUseCase() {
        return new CityWeatherReadUseCase(this.cityWeatherRepository);
    }
}
