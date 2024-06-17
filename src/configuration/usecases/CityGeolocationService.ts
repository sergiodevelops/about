import { injectable, inject } from "inversify";
import { TYPES } from 'constants/types';
import ICityGeolocationRepository from "application/repositories/ICityGeolocationRepository";
import CityGeolocationListUseCase from "application/usecases/cityGeolocation/findOne/CityGeolocationFindOneUseCase";


@injectable()
export default class CityGeolocationService {
    @inject(TYPES.ICityGeolocationRepository)
    private cityGeolocationRepository: ICityGeolocationRepository;

    public getCityGeolocationListUseCase() {
        return new CityGeolocationListUseCase(this.cityGeolocationRepository);
    }
}
