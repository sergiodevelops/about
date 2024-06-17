import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional,
} from 'class-validator';


export default class CamelCase {

    @IsString()
    @IsNotEmpty()
    public var1: string;

    @IsString()
    @IsNotEmpty()
    public var2: string;

    @IsNumber()
    @IsOptional()
    public id?: number;


    constructor(
        var1: string,
        var2: string,
        id?: number,
    ) {
        this.var1 = var1;
        this.var2 = var2;
        this.id = id;
    }
}
