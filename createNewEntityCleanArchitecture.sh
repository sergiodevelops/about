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

  echo " ";
  echo "\"ENTITY (domain object) (fileName && className)\" -->${bold}\"src/domain/${domainName}/${domainClass}.ts\"${normal}";
  echo " ";
  read -p "Do you want to continue?: [${bold}y${normal}/N]" response;
  if [[ $response = "y" ]]; then
#    mkdir -p src/domain/${domainName}
#    echo "export default class ${domainClass} {}" | tee -a src/domain/${domainName}/${domainClass}.ts
    echo "Successful ENTITY (domain object) files creation!";
    break;
  fi
done




# "external systems" layer 4°
echo "---------------------------------------------------------";
echo "step 2) Registration files for the \"APPLICATION object\"";
echo "---------------------------------------------------------";
