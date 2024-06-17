import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional,
} from 'class-validator';


export default class CityGeolocation {

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public state: string;

    @IsString()
    @IsNotEmpty()
    public country: string;

    @IsNumber()
    @IsNotEmpty()
    public lat: number;

    @IsNumber()
    @IsNotEmpty()
    public lon: number;

    @IsNumber()
    @IsOptional()
    public id?: number;


    constructor(
        name: string,
        state: string,
        country: string,
        lat: number,
        lon: number,
        id?: number,
    ) {
        this.name = name;
        this.state = state;
        this.country = country;
        this.lat = lat;
        this.lon = lon;
        this.id = id;
    }
}
