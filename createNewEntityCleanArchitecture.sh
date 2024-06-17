#!/bin/bash
# Create new entity for "React Front End App"

# text styles
bold=$(tput bold);
normal=$(tput sgr0);
response='';

# messages
welcomeProgMsg="${bold}Welcome to \"Clean Architecture for React.js project\" program v1.0.0${normal}"
descriptionProgMsg="${bold}Next you can create the necessary files for your new product entity in your \"Clean Architecture\"${normal}"
endedMsg="${bold}The program has ended"
enterToContinueMsg="Please, press ENTER to continue"
orExitMsg="or type \"exit\" and ENTER (or \"CTRL + C\") for cancel the process: "
entitiesMsg="\"ENTITIES (domain object)\""
useCasesMsg="\"USE CASES (reposotory interface)\")"
repositoryInterfacesMsg="\"ADAPTERS\" (reposotory interface)\")"

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




# "ENTITIES" (domain objects) - layer 1:
# 1) Create entities: business logic encapsulated in domain objects
echo "---------------------------------------------------------";
echo "step 1) Creating of \"ENTITY (domain object)\"";
echo "----------------------------------------------------";
domainSrcPath="src/domain"

domainClassName="";
repoInterfaceName="";

while [[ $response = "y" ]]
  echo "Please, enter the \"ENTITY (domain object) name\" --> e.g. \"internalClient\"";
  echo " \"CTRL + C\" or \"exit\" for cancel the process";

do
  read -p "Please, enter the name in \"camelCase\": " response;
  if [[ $response = exit ]]; then
    echo "${bold}the program has ended";
    exit
  fi

  domainFileName=${response,};
  domainClassName=${domainFileName^};

  repoInterfaceName="I${domainClassName}";
  echo "The 'repoInterfaceName' created is --> '${repoInterfaceName}'"


  echo " ";
  echo "\"ENTITY (domain object) (fileName && className)\" -->${bold}\"${domainSrcPath}/${domainFileName}/${domainClassName}.ts\"${normal}";
  echo " ";

  read -p "Do you want to continue?: [${bold}y${normal}/N]: " response;
  if [[ $response = "y" ]]; then
    mkdir -p "${domainSrcPath}/${domainFileName}"
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

# CONTINUAR ESTA PARTE QUE SIGUE

# "external systems" layer 4°
echo "---------------------------------------------------------";
echo "step 2) Registration files for the \"APPLICATION object\"";
echo "---------------------------------------------------------";
applicationSrcPath="src/application"
applicationUseCasesSrcPath="src/application/usecases"

mkdir -p "${applicationSrcPath}/repositories"
rm "${applicationSrcPath}/repositories/${repoInterfaceName}.ts"

read -p "Por favor ingrese el verbo del caso de uso como por ej. 'list': " verbUseCase
mkdir -p "${applicationUseCasesSrcPath}/${domainFileName}/${verbUseCase}"

echo "export default interface ${repoInterfaceName} {
   ${verbUseCase}(arg1: any, arg2: any, abortSignal?: AbortSignal): Promise<Authentication>;
}" | tee -a "${applicationSrcPath}/repositories/${repoInterfaceName}.ts"

useCaseName="${domainClassName}${verbUseCase^}UseCase"
echo "The 'useCaseName' created is --> '${useCaseName}'"

rm "${applicationUseCasesSrcPath}/${domainFileName}/${verbUseCase}/I${useCaseName}.ts"
echo "export default interface I${useCaseName} {}" | tee -a "${applicationUseCasesSrcPath}/${domainFileName}/${verbUseCase}/I${useCaseName}.ts"
rm "${applicationUseCasesSrcPath}/${domainFileName}/${verbUseCase}/${useCaseName}.ts"
echo "export default class ${useCaseName} {}" | tee -a "${applicationUseCasesSrcPath}/${domainFileName}/${verbUseCase}/${useCaseName}.ts"
rm "${applicationUseCasesSrcPath}/${domainFileName}/I${domainClassName}Dto.ts"
echo "export default interface I${domainClassName}Dto {}" | tee -a "${applicationUseCasesSrcPath}/${domainFileName}/I${domainClassName}Dto.ts"

echo " ";
echo "Alta de configuración del servicio"
echo "----------------------------------"
configUseCasesSrcPath=src/configuration/usecases

serviceName="${domainClassName}Service"
echo "The 'serviceName' created is --> '${serviceName}'"

rm "${configUseCasesSrcPath}/${serviceName}.ts"
echo "import { injectable, inject } from 'inversify';
import { TYPES } from 'constants/types';
import ${repoInterfaceName} from 'application/repositories/${repoInterfaceName}';
import ${useCaseName} from 'application/usecases/${domainFileName}/${verbUseCase}/${useCaseName}';

@injectable()
export default class ${serviceName} {
    @inject(TYPES.${repoInterfaceName})
    private ${domainFileName}Repository: ${repoInterfaceName};

    public get${useCaseName}() {
        return new ${useCaseName}(this.${domainFileName}Repository);
    }
}" | tee -a "${configUseCasesSrcPath}/${serviceName}.ts"

head -n -1 "src/constants/types.ts" > types.tmp.ts && mv types.tmp.ts "src/constants/types.ts"
echo "
    ${repoInterfaceName}: Symbol.for('${repoInterfaceName}')," | tee -a "src/constants/types.ts"
echo "    ${serviceName}: Symbol.for('${serviceName}')," | tee -a "src/constants/types.ts"
echo "}" | tee -a "src/constants/types.ts"

echo " ";
echo "Registration of REPOSITORY objects"
echo "-------------------------------"
infrastructureSrcPath="src/infrastructure/repositories"

mkdir -p "${infrastructureSrcPath}/${domainFileName}"

read -p "Please enter the name of the repository class such as e.g. 'RepositoryNameDb' or 'RepositoryNameFake': " repositoryName
echo "The 'repositoryNameInScreamingSnakeCase' created is --> '${repositoryName}'"

repositoryClassName="${domainClassName}${repositoryName}Repository"
echo "The 'repositoryClassName' created is --> '${repositoryClassName}'"


read -p "Please enter the name of the repository environment variable, e.g. 'REPOSITORY_ENV_NAME' e.g. 'REPOSITORY_API_DB_NAME' or 'REPOSITORY_API_FAKE_NAME': " repositoryNameInScreamingSnakeCase
echo "The 'REPOSITORY_URL_ENV' created is --> '${repositoryNameInScreamingSnakeCase}'"

rm "${infrastructureSrcPath}/${domainFileName}/${repositoryClassName}.ts";


# CREATE Repository class:
# CityGeolocationOpenWeatherMapApiDbRepository.ts
# ${domainClassName}${repositoryName}Repository

echo "import { injectable } from 'inversify';
import env from '@beam-australia/react-env';
//import { checkResp, getRespJson, throwError } from 'infrastructure/helpers/Responses';
import ${repoInterfaceName} from 'application/repositories/${repoInterfaceName}';
import ${domainClassName} from 'domain/${domainFileName}/${domainClassName}';

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

        const endpoint = new URL(`${this.api_url}/${apiServiceName}/${apiServiceVersion}/${apiServiceResource}`);
        endpoint.searchParams.append("appid", appid);

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

        const ${domainFileName}s: ${repositoryClassName}[] = response;

        return ${domainFileName}s.map(${repositoryResponseMapperClassName}.toEntity);
    }

}" | tee -a "${infrastructureSrcPath}/${domainFileName}/${repositoryClassName}.ts";


# CREATE Repository "Request Mapper (RQM)" class: ClassName
repositoryRequestMapperClassName="${domainClassName}${repositoryName}RequestMapper"
repoInterfaceRequestMapperClassName="${repoInterfaceName}RequestMapper"
echo "// imports;

export default class ${repositoryRequestMapperClassName} implements ${repoInterfaceRequestMapperClassName} {
// code class content
}" | tee -a "${infrastructureSrcPath}/${domainFileName}/${repositoryRequestMapperClassName}.ts";


# CREATE Repository "Response Mapper (RRM)" class:
repositoryResponseMapperClassName="${domainClassName}${repositoryName}ResponseMapper"
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


# CREATE Repository "Interface Request (RIQ)" class:
repositoryInterfaceRequestClassName="${repoInterfaceName}${repositoryName}Request"
echo "export default interface ${repositoryInterfaceRequestClassName}Request {
    reqProp1: string,
    reqProp2: string,
}" | tee -a "${infrastructureSrcPath}/${domainFileName}/${repositoryInterfaceRequestClassName}.ts";


# CREATE Repository "Interface Response (RIR)" class:
repositoryInterfaceResponseClassName="${repoInterfaceName}${repositoryName}Response"
echo "export default interface ${repositoryInterfaceResponseClassName}Response {
    responseProp1: string,
    responseProp2: string,
}" | tee -a "${infrastructureSrcPath}/${domainFileName}/${repositoryInterfaceResponseClassName}.ts";


echo "----------------------------------------";
echo "The 'new entity' Clean Architecture was created successfully!";
echo "----------------------------------------";

echo "'domainFileName.ts' created is --> '${domainFileName}'"
echo "'DomainClassName' created is --> '${domainClassName}'"


echo "'useCaseName' created is --> '${useCaseName}'"
echo "'verbUseCase' created is --> '${verbUseCase}'"

echo "'serviceName' created is --> '${serviceName}'"

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
