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
  echo "\"ENTITY (domain object) (fileName && className)\" -->${bold}\"src/domain/${domainFileName}/${domainClassName}.ts\"${normal}";
  echo " ";

  read -p "Do you want to continue?: [${bold}y${normal}/N]" response;
  if [[ $response = "y" ]]; then
    mkdir -p "src/domain/${domainFileName}"
    rm "src/domain/${domainFileName}/${domainClassName}.ts"
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
}" | tee -a "src/domain/${domainFileName}/${domainClassName}.ts"
    echo "Successful ENTITY (domain object) files creation!";
    break;
  fi
done

# CONTINUAR ESTA PARTE QUE SIGUE

# "external systems" layer 4°
echo "---------------------------------------------------------";
echo "step 2) Registration files for the \"APPLICATION object\"";
echo "---------------------------------------------------------";

mkdir -p "src/application/repositories"
rm "src/application/repositories/${repoInterfaceName}.ts"
echo "export default interface ${repoInterfaceName} {}" | tee -a "src/application/repositories/${repoInterfaceName}.ts"

read -p "Por favor ingrese el verbo del caso de uso como por ej. 'list': " verbUseCase
mkdir -p "src/application/usecases/${domainFileName}/${verbUseCase}"

useCaseName="${domainClassName}${verbUseCase^}UseCase"
echo "The 'useCaseName' created is --> '${useCaseName}'"

rm "src/application/usecases/${domainFileName}/${verbUseCase}/I${useCaseName}.ts"
echo "export default interface I${useCaseName} {}" | tee -a "src/application/usecases/${domainFileName}/${verbUseCase}/I${useCaseName}.ts"
rm "src/application/usecases/${domainFileName}/${verbUseCase}/${useCaseName}.ts"
echo "export default class ${useCaseName} {}" | tee -a "src/application/usecases/${domainFileName}/${verbUseCase}/${useCaseName}.ts"
rm "src/application/usecases/${domainFileName}/I${domainClassName}Dto.ts"
echo "export default interface I${domainClassName}Dto {}" | tee -a "src/application/usecases/${domainFileName}/I${domainClassName}Dto.ts"

echo " ";
echo "Alta de configuración del servicio"
echo "----------------------------------"

serviceName="${domainClassName}Service"
echo "The 'serviceName' created is --> '${serviceName}'"

rm "src/configuration/usecases/${serviceName}.ts"
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
}" | tee -a "src/configuration/usecases/${serviceName}.ts"

head -n -1 "src/constants/types.ts" > types.tmp.ts && mv types.tmp.ts "src/constants/types.ts"
echo "
    ${repoInterfaceName}: Symbol.for('${repoInterfaceName}')," | tee -a "src/constants/types.ts"
echo "    ${serviceName}: Symbol.for('${serviceName}')," | tee -a "src/constants/types.ts"
echo "}" | tee -a "src/constants/types.ts"

echo " ";
echo "Alta de objetos del repositorio"
echo "-------------------------------"

mkdir -p "src/infrastructure/repositories/${domainFileName}"

read -p "Por favor ingrese el nombre de la clase del repositorio como por ej. 'MyRepositoryNameDB' or 'MyRepositoryNameFake': " repositoryClassName

repositoryClassName="${domainClassName}${repositoryClassName}Repository"
echo "The 'repositoryClassName' created is --> '${repositoryClassName}'"


read -p "Por favor ingrese el nombre de la variable de entorno del repositorio, ej. 'MY_REPOSITORY_NAME_API_DB' or 'MY_REPOSITORY_NAME_API_FAKE': " repositoryEnvName
echo "The 'MY_REPOSITORY_NAME_API_DB' created is --> '${repositoryEnvName}'"

rm "src/infrastructure/repositories/${domainFileName}/${repositoryClassName}.ts";

echo "import { injectable } from 'inversify';
import env from '@beam-australia/react-env';
import { checkResp, getRespJson, throwError } from 'infrastructure/helpers/Responses';
import Authentication from 'infrastructure/repositories/authentication/Authentication';
import ${repoInterfaceName} from 'application/repositories/${repoInterfaceName}';
import ${domainClassName} from 'domain/${domainFileName}/${domainClassName}';

@injectable()
export default class ${repositoryClassName} extends Authentication implements ${repoInterfaceName} {
    private static readonly ${repositoryEnvName}_URL: string = env('GATEWAY_URL') || 'http://localhost:9999';
    private static readonly ${repositoryEnvName}_RESOURCE: string = '${domainFileName}';

    private readonly api_url: string;
    private readonly headers: Headers;

    constructor() {
        super();
        this.api_url = ${repositoryClassName}.${repositoryEnvName}_URL;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }
}" | tee -a "src/infrastructure/repositories/${domainFileName}/${repositoryClassName}.ts";


echo "----------------------------------------";
echo "The 'new entity' Clean Architecture was created successfully!";
echo "----------------------------------------";

echo "'repoInterfaceName' created is --> '${repoInterfaceName}'"
echo "'useCaseName' created is --> '${useCaseName}'"
echo "'serviceName' created is --> '${serviceName}'"
echo "'repositoryClassName' created is --> '${repositoryClassName}'"
echo "The 'MY_REPOSITORY_NAME_API_DB' created is --> '${repositoryEnvName}'"

echo " ";
read -p "'ENTER' for exit the program" pausa
exit;
