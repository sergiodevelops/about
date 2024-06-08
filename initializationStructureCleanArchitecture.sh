#!/bin/bash
# Create base files structure for "React Front End App"

# text styles
bold=$(tput bold);
normal=$(tput sgr0);
response='';

# messages
welcomeProgMsg="${bold}Welcome to \"Base Files Structure for React.js project\" program v1.0.0${normal}"
descriptionProgMsg="${bold}Next you can create the necessary files for your new React.js product${normal}"

# welcome message program
echo "${welcomeProgMsg}";
echo "${descriptionProgMsg}";
exit

# create folders
dirs=(presentation two three four five)
for dir in "${dirs[@]}"
do
   mkdir -p "$HOME/web/$dir"
done
