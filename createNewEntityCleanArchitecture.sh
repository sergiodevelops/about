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

domainClass="";
repoInterface="";

while [[ $response = "y" ]]
  echo "Please, enter the \"ENTITY (domain object) name\" --> e.g. \"internalClient\"";
  echo " \"CTRL + C\" or \"exit\" for cancel the process";

do
  read -p "Please, enter the name in \"camelCase\": " response;
  if [[ $response = exit ]]; then
    echo "${bold}the program has ended";
    exit
  fi

  domainName=${response,};
  domainClass=${domainName^};
  repoInterface="I${domainClass}";

  echo " ";
  echo "\"ENTITY (domain object) (fileName && className)\" -->${bold}\"src/domain/${domainName}/${domainClass}.ts\"${normal}";
  echo " ";
  read -p "Do you want to continue?: [${bold}y${normal}/N]" response;
  if [[ $response = "y" ]]; then
    mkdir -p "src/domain/${domainName}"
    rm "src/domain/${domainName}/${domainClass}.ts"
    echo "export default class ${domainClass} {}" | tee -a "src/domain/${domainName}/${domainClass}.ts"
    echo "Successful ENTITY (domain object) files creation!";
    break;
  fi
done

# CONTINUAR ESTA PARTE QUE SIGUE

# "external systems" layer 4°
echo "---------------------------------------------------------";
echo "step 2) Registration files for the \"APPLICATION object\"";
echo "---------------------------------------------------------";

read -p "El nombre de la interface será: ${repoInterface}" pausa
mkdir -p "src/application/repositories"
rm "src/application/repositories/${repoInterface}.ts"
echo "export default interface ${repoInterface} {}" | tee -a "src/application/repositories/${repoInterface}.ts"

read -p "Por favor ingrese el verbo del caso de uso como por ej. 'list': " verbUseCase
mkdir -p "src/application/usecases/${domainName}/${verbUseCase}"

nameUseCase="${domainClass}${verbUseCase^}UseCase"

read -p "El nombre del caso de uso será: ${nameUseCase}" pausa
rm "src/application/usecases/${domainName}/${verbUseCase}/I${nameUseCase}.ts"
echo "export default interface I${nameUseCase} {}" | tee -a "src/application/usecases/${domainName}/${verbUseCase}/I${nameUseCase}.ts"
rm "src/application/usecases/${domainName}/${verbUseCase}/${nameUseCase}.ts"
echo "export default class ${nameUseCase} {}" | tee -a "src/application/usecases/${domainName}/${verbUseCase}/${nameUseCase}.ts"
rm "src/application/usecases/${domainName}/I${domainClass}Dto.ts"
echo "export default interface I${domainClass}Dto {}" | tee -a "src/application/usecases/${domainName}/I${domainClass}Dto.ts"

echo "\n"
echo "Alta de configuración del servicio"
echo "----------------------------------"

nameService="${domainClass}Service"

read -p "El nombre del servicio será: ${nameService}" pausa
rm "src/configuration/usecases/${nameService}.ts"
echo "import { injectable, inject } from 'inversify';
import { TYPES } from 'constants/types';
import ${repoInterface} from 'application/repositories/${repoInterface}';
import ${nameUseCase} from 'application/usecases/${domainName}/${verbUseCase}/${nameUseCase}';

@injectable()
export default class ${nameService} {
    @inject(TYPES.${repoInterface})
    private ${domainName}Repository: ${repoInterface};

    public get${nameUseCase}() {
        return new ${nameUseCase}(this.${domainName}Repository);
    }
}" | tee -a "src/configuration/usecases/${nameService}.ts"

head -n -1 "src/constants/types.ts" > types.tmp.ts && mv types.tmp.ts "src/constants/types.ts"
echo "
    ${repoInterface}: Symbol.for('${repoInterface}')," | tee -a "src/constants/types.ts"
echo "    ${nameService}: Symbol.for('${nameService}')," | tee -a "src/constants/types.ts"
echo "}" | tee -a "src/constants/types.ts"

echo "\n"
echo "Alta de objetos del repositorio"
echo "-------------------------------"

mkdir -p "src/infrastructure/repositories/${domainName}"

read -p "Por favor ingrese el nombre de la clase del repositorio como por ej. 'MyRepositoryNameDB' or 'MyRepositoryNameFake': " repositoryName
repositoryName="${domainClass}${repositoryName}Repository"
read -p "El nombre de la clase del repositorio será: '${repositoryName}'" pausa

rm "src/infrastructure/repositories/${domainName}/${repositoryName}.ts";

echo "import { injectable } from 'inversify';
import env from '@beam-australia/react-env';
import { checkResp, getRespJson, throwError } from 'infrastructure/helpers/Responses';
import Authentication from 'infrastructure/repositories/authentication/Authentication';
import ${repoInterface} from 'application/repositories/${repoInterface}';
import ${domainClass} from 'domain/${domainName}/${domainClass}';

@injectable()
export default class ${repositoryName} extends Authentication implements ${repoInterface} {
    private static readonly ZOOM_API_DB_LOCAL_URL: string = env('GATEWAY_URL') || 'http://localhost:9999';
    private static readonly ZOOM_API_DB_LOCAL_RESOURCE: string = '${domainName}';

    private readonly api_url: string;
    private readonly headers: Headers;

    constructor() {
        super();
        this.api_url = ${repositoryName}.ZOOM_API_DB_LOCAL_URL;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }
}" | tee -a "src/infrastructure/repositories/${domainName}/${repositoryName}.ts";

echo "----------------------------------------";
echo "The new entity was created successfully!";
echo "----------------------------------------";
