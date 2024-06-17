#!/bin/bash
# Create new entity for "React Front End App"

# text styles
bold=$(tput bold);
normal=$(tput sgr0);
response='';

# messages
welcomeProgMsg="${bold}Welcome to 'Clean Architecture for React.js project' program v1.0.0${normal}"
descriptionProgMsg="${bold}Next you can create the necessary files for your new product entity in your 'Clean Architecture'${normal}"
endedMsg="${bold}The program has ended"
enterToContinueMsg="Please, press ENTER to continue"
orExitMsg="or type 'exit' and ENTER (or 'CTRL + C') for cancel the process: "
entitiesMsg="'ENTITIES (domain object)'"
useCasesMsg="'USE CASES (reposotory interface)')"
repositoryInterfacesMsg="'ADAPTERS' (reposotory interface)')"

# welcome message program
echo "${welcomeProgMsg}";
echo "${descriptionProgMsg}";

# continue or exit program
echo "${enterToContinueMsg}";
read -p "${orExitMsg}" response;
if [[ $(echo $response | tr '[:upper:]' '[:lower:]') = exit ]]; then
  echo "${bold}The program has ended";
  exit
fi




#-------------------------------------------------------------
# "ENTITIES" (domain objects) - layer 1:
# 1) Create entities: business logic encapsulated in domain objects
echo "---------------------------------------------------------";
echo "step 1) Registration files for the 'ENTITY domain objects'";
echo "----------------------------------------------------";
domainSrcPath="src/domain"
domainClassName="";

while [[ $response = "y" ]]
  echo "Please, enter the 'ENTITY (domain object) name' --> e.g. 'internalClient'";
  echo " 'CTRL + C' or 'exit' for cancel the process";

do
  read -p "Please, enter the name in 'camelCase': " response;
  if [[ $response = exit ]]; then
    echo "${bold}the program has ended";
    exit
  fi

  domainFileName=${response,};
  domainClassName=${domainFileName^};


  echo " ";
  echo "'ENTITY (domain object) (fileName && className)' -->${bold}'${domainSrcPath}/${domainFileName}/${domainClassName}.ts'${normal}";
  echo " ";

  read -p "Do you want to continue?: [${bold}y${normal}/N]: " response;
  if [[ $response = "y" ]]; then
    mkdir -p "${domainSrcPath}/${domainFileName}";

    rm "${domainSrcPath}/${domainFileName}/${domainClassName}.ts"
    echo "import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional,
} from 'class-validator';


export default class ${domainClassName} {

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
}" | tee -a "${domainSrcPath}/${domainFileName}/${domainClassName}.ts"
    echo "Successful ENTITY (domain object) files creation!";
    break;
  fi
done




#-------------------------------------------------------------
# "external systems" layer 4°
echo "---------------------------------------------------------";
echo "step 2) Registration files for the 'APPLICATION object'";
echo "---------------------------------------------------------";
applicationSrcPath="src/application"
applicationUseCasesSrcPath="src/application/usecases"
applicationRepositoriesSrcPath="${applicationSrcPath}/repositories"

mkdir -p "${applicationRepositoriesSrcPath}"

read -p "Por favor ingrese el verbo del caso de uso como por ej. 'list': " verbUseCase
mkdir -p "${applicationUseCasesSrcPath}/${domainFileName}/${verbUseCase}"




#-------------------------------------------------------------
useCaseClassName="${domainClassName}${verbUseCase^}UseCase";
useCaseInterfaceName="I${useCaseClassName}";
echo "The 'UseCaseClassName' created is --> '${useCaseClassName}'";
echo "The 'IUseCaseClassName' created is --> '${useCaseInterfaceName}'";
rm "${applicationUseCasesSrcPath}/${domainFileName}/${verbUseCase}/${useCaseInterfaceName}.ts"
echo "export default interface ${useCaseInterfaceName} {

}" | tee -a "${applicationUseCasesSrcPath}/${domainFileName}/${verbUseCase}/${useCaseInterfaceName}.ts"




#-------------------------------------------------------------
echo "---------------------------------------------------------";
echo "CREATE interface for the 'DTO object'";
echo "---------------------------------------------------------";
interfaceNameDto="${domainClassName}Dto";
rm "${applicationUseCasesSrcPath}/${domainFileName}/${interfaceNameDto}.ts";
echo "export default interface ${interfaceNameDto} {
  propDto1: string;
  propDto2: string;
  id?: number;
}" | tee -a "${applicationUseCasesSrcPath}/${domainFileName}/${interfaceNameDto}.ts"




#-------------------------------------------------------------
echo " ";
echo "CREATE files for the 'Services'"
echo "----------------------------------"
configUseCasesSrcPath=src/configuration/usecases
serviceName="${domainClassName}Service"
echo "The 'serviceName' created is --> '${serviceName}'"

rm "${configUseCasesSrcPath}/${serviceName}.ts"
echo "import { injectable, inject } from 'inversify';
import { TYPES } from 'constants/types';
import ${repoInterfaceName} from 'application/repositories/${repoInterfaceName}';
import ${useCaseClassName} from 'application/usecases/${domainFileName}/${verbUseCase}/${useCaseClassName}';

@injectable()
export default class ${serviceName} {
    @inject(TYPES.${repoInterfaceName})
    private ${domainFileName}Repository: ${repoInterfaceName};

    public get${useCaseClassName}() {
        return new ${useCaseClassName}(this.${domainFileName}Repository);
    }
}" | tee -a "${configUseCasesSrcPath}/${serviceName}.ts"




#-------------------------------------------------------------
echo " ";
echo "Registration of TYPES Symbols"
echo "-------------------------------"
constantsSrcPath="src/constants"
if [ ! -e "${constantsSrcPath}/types.ts" ]; then
  echo "export const TYPES = {
    ${repoInterfaceName}: Symbol.for('${repoInterfaceName}'),
    ${serviceName}: Symbol.for('${serviceName}'),
  }" | tee -a "${constantsSrcPath}/types.ts";
else
  head -n -1 "${constantsSrcPath}/types.ts" > types.tmp.ts && mv types.tmp.ts "${constantsSrcPath}/types.ts"
  echo "
      ${repoInterfaceName}: Symbol.for('${repoInterfaceName}'),
      ${serviceName}: Symbol.for('${serviceName}'),
  }" | tee -a "${constantsSrcPath}/types.ts";
fi



#-------------------------------------------------------------
echo " ";
echo "step 3) Registration of REPOSITORY objects"
echo "-------------------------------"
infrastructureSrcPath="src/infrastructure/repositories"

mkdir -p "${infrastructureSrcPath}/${domainFileName}"

read -p "Please enter the name of the repository class such as e.g. 'RepositoryNameDb' or 'RepositoryNameFake': " repositoryName
repositoryName="${repositoryName^}"
repositoryInterfaceName="I${repositoryName}Repository"
echo "The 'repositoryName' created is --> '${repositoryName}'"
echo "The 'repositoryInterfaceName' created is --> '${repositoryInterfaceName}'"


#-------------------------------------------------------------
echo "The 'repoInterfaceName' created is --> '${repoInterfaceName}'"
rm "${applicationRepositoriesSrcPath}/${repoInterfaceName}.ts"
echo "import Filter from "domain/filter/Filter";
import ${domainClassName} from 'domain/${domainFileName}/${domainClassName}';


export default interface ${repoInterfaceName} {
   ${verbUseCase}(filter: Filter, abortSignal?: AbortSignal): Promise<${domainClassName}>;
}" | tee -a "${applicationRepositoriesSrcPath}/${repoInterfaceName}.ts"





#-------------------------------------------------------------
rm "${applicationUseCasesSrcPath}/${domainFileName}/${verbUseCase}/${useCaseClassName}.ts"
echo "export default class ${useCaseClassName} {
    private ${repositoryName,}: ICamelCaseRepository;


    constructor(camelCaseRepository: ICamelCaseRepository) {
        this.camelCaseRepository = camelCaseRepository;
    }


    public async ${verbUseCase}(filter: Filter, abortSignal?: AbortSignal): Promise<ICamelCaseDto[]> {
        return await this.camelCaseRepository.list(abortSignal);
    }
}" | tee -a "${applicationUseCasesSrcPath}/${domainFileName}/${verbUseCase}/${useCaseClassName}.ts"




#-------------------------------------------------------------
repositoryClassName="${domainClassName}${repositoryName}Repository"

echo "The 'repositoryClassName' created is --> '${repositoryClassName}'"


read -p "Please enter the name of the repository name environment variable, e.g. 'REPOSITORY_API_DB_NAME' or 'REPOSITORY_API_FAKE_NAME': " repositoryNameInScreamingSnakeCase
echo "The 'REPOSITORY_NAME' created is --> '${repositoryNameInScreamingSnakeCase}'"

read -p "Please enter the name of the repository service environment variable, e.g. 'GEOLOCATION'  or 'WEATHER': " repositoryServiceNameInScreamingSnakeCase
echo "The 'REPOSITORY_SERVICE_NAME' created is --> '${repositoryServiceNameInScreamingSnakeCase}'"


#-------------------------------------------------------------
# CREATE Repository class:
# CityGeolocationOpenWeatherMapApiDbRepository.ts
# ${domainClassName}${repositoryName}Repository

rm "${infrastructureSrcPath}/${domainFileName}/${repositoryClassName}.ts";
echo "import { injectable } from 'inversify';
import env from '@beam-australia/react-env';
import {checkResp, getRespJson, getUrlWithParams, throwError} from 'infrastructure/helpers/Responses';
import ${domainClassName} from 'domain/${domainFileName}/${domainClassName}';
import ${repoInterfaceName} from 'application/repositories/${repoInterfaceName}';
import Filter from 'domain/filter/Filter';
import ${repositoryResponseMapperClassName} from 'infrastructure/repositories/${domainFileName}/${repositoryResponseMapperClassName}';


@injectable()
export default class ${repositoryClassName} implements ${repoInterfaceName} {
    private static readonly ${repositoryNameInScreamingSnakeCase}_URL: string = env('${repositoryNameInScreamingSnakeCase}_URL') || 'http://localhost:3000';
    private static readonly ${repositoryNameInScreamingSnakeCase}_KEY: string = env('${repositoryNameInScreamingSnakeCase}_KEY') || 'repositoryKey';
    private static readonly ${repositoryNameInScreamingSnakeCase}_SERVICE_NAME: string = env('${repositoryNameInScreamingSnakeCase}_${repositoryServiceNameInScreamingSnakeCase}_NAME') || 'repositoryServiceName';
    private static readonly ${repositoryNameInScreamingSnakeCase}_SERVICE_VERSION: string = env('${repositoryNameInScreamingSnakeCase}_${repositoryServiceNameInScreamingSnakeCase}_VERSION') || 'repositoryServiceVersion';
    private static readonly ${repositoryNameInScreamingSnakeCase}_SERVICE_RESOURCE: string = env('${repositoryNameInScreamingSnakeCase}_${repositoryServiceNameInScreamingSnakeCase}_RESOURCE') || 'repositoryServiceResource';


    private readonly api_url: string;
    private readonly headers: Headers;


    constructor() {
        this.api_url = ${repositoryClassName}.${repositoryNameInScreamingSnakeCase}_URL;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }

    public async ${verbUseCase}(filter: Filter, abortSignal?: AbortSignal): Promise<${domainClassName}[]> {

        const apiServiceName = ${domainClassName}OpenWeatherMapApiDbRepository.OWM_API_DB_SERVICE;
        const apiServiceVersion = ${domainClassName}OpenWeatherMapApiDbRepository.OWM_API_DB_VERSION;
        const apiServiceResource = ${domainClassName}OpenWeatherMapApiDbRepository.OWM_API_DB_RESOURCE;
        const appid = ${domainClassName}OpenWeatherMapApiDbRepository.OWM_API_KEY;

        const endpoint = new URL(\`${this.api_url}/${apiServiceName}/${apiServiceVersion}/${apiServiceResource}\`);
        endpoint.searchParams.append('appid', appid);

        const queryParams: any = filter.filters;
        const url = getUrlWithParams(endpoint, queryParams);

        const params: RequestInit = {
            method: 'GET',
            headers: this.headers,
            signal: abortSignal,
        }

        const response = await fetch(url, params)
            .then((resp) => getRespJson(checkResp(resp)))
            .catch(throwError);

        const ${domainFileName}s: ${repositoryClassName}[] = response;

        return ${domainFileName}s.map(${repositoryResponseMapperClassName}.toEntity);
    }

}" | tee -a "${infrastructureSrcPath}/${domainFileName}/${repositoryClassName}.ts";


#-------------------------------------------------------------
# CREATE Repository "Request Mapper (RQM)" class: ClassName
repositoryRequestMapperClassName="${domainClassName}${repositoryName}RequestMapper";
repoInterfaceRequestMapperClassName="${repoInterfaceName}RequestMapper";
rm "${infrastructureSrcPath}/${domainFileName}/${repositoryRequestMapperClassName}.ts"
echo "import ${interfaceNameDto} from 'application/usecases/${domainFileName}/${interfaceNameDto}';
import ${repoInterfaceRequestMapperClassName} from 'infrastructure/repositories/${domainFileName}/${repoInterfaceRequestMapperClassName}';


export default class ${repositoryRequestMapperClassName} {
    public static toObject(${domainFileName}: ${interfaceNameDto}): ${repoInterfaceRequestMapperClassName} {
        const {objects, name} = ${domainFileName};
        const objectsMapped: Object[] = objects.map((elem: number) => elem.id);

        return {
            name: name,
            objects: objectsMapped,
        };
    }
}" | tee -a "${infrastructureSrcPath}/${domainFileName}/${repositoryRequestMapperClassName}.ts";


#-------------------------------------------------------------
# CREATE Repository "Response Mapper (RRM)" class:
repositoryResponseMapperClassName="${domainClassName}${repositoryName}ResponseMapper";
rm "${infrastructureSrcPath}/${domainFileName}/${repositoryResponseMapperClassName}.ts";
echo "import ${domainClassName} from 'domain/${domainFileName}/${domainClassName}';
import ${repoInterfaceName}${repositoryName}Response from 'infrastructure/repositories/${domainFileName}/${repoInterfaceName}${repositoryName}Response';
import ${repoInterfaceName}${repositoryName}Response from 'infrastructure/repositories/${domainFileName}/${repoInterfaceName}${repositoryName}Response';


export default class ${repositoryResponseMapperClassName}ResponseMapper {
    public static toEntity(${domainFileName}Mapper: ${repoInterfaceName}${repositoryName}Response): ${domainClassName} {
        return new ${domainClassName}(
            ${domainFileName}Mapper.reqProp1,
            ${domainFileName}Mapper.reqProp2,
        );
    }
}
}" | tee -a "${infrastructureSrcPath}/${domainFileName}/${repositoryResponseMapperClassName}.ts";


#-------------------------------------------------------------
# CREATE Repository "Interface Request (RIQ)" class:
repositoryInterfaceRequestClassName="${repoInterfaceName}${repositoryName}Request";
rm "${infrastructureSrcPath}/${domainFileName}/${repositoryInterfaceRequestClassName}.ts";
echo "export default interface ${repositoryInterfaceRequestClassName}Request {
    reqProp1: string,
    reqProp2: string,
}" | tee -a "${infrastructureSrcPath}/${domainFileName}/${repositoryInterfaceRequestClassName}.ts";


#-------------------------------------------------------------
# CREATE Repository "Interface Response (RIR)" class:
repositoryInterfaceResponseClassName="${repoInterfaceName}${repositoryName}Response";
rm "${infrastructureSrcPath}/${domainFileName}/${repositoryInterfaceResponseClassName}.ts";
echo "export default interface ${repositoryInterfaceResponseClassName}Response {
    responseProp1: string,
    responseProp2: string,
}" | tee -a "${infrastructureSrcPath}/${domainFileName}/${repositoryInterfaceResponseClassName}.ts";


echo "----------------------------------------";
echo "'Clean Architecture files' for 'new entity' was created successfully!";
echo "----------------------------------------";

echo "'domainFileName.ts' created is --> '${domainFileName}'"
echo "'DomainClassName' created is --> '${domainClassName}'"

echo "'UseCaseClassName' created is --> '${useCaseClassName}'"
echo "'verbUseCase' created is --> '${verbUseCase}'"

echo "'ServiceName' created is --> '${serviceName}'"

echo "'IRepoInterfaceName' created is --> '${repoInterfaceName}'"
echo "'RepositoryClassName' created is --> '${repositoryClassName}'"
echo "'REPOSITORY_NAME' created is --> '${repositoryNameInScreamingSnakeCase}'"
echo "'REPOSITORY_SERVICE_NAME' created is --> '${repositoryServiceNameInScreamingSnakeCase}'"


echo " ";
read -p "'ENTER' for exit the program. " pausa
exit;

#SERVICE_NAME <-- SCREAMING_SNAKE_CASE
#service_name <-- snake_case
#serviceName <-- camelCase
#ServiceName <-- PascalCase
