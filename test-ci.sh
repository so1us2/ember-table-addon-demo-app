#!/bin/sh
result=1

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

echo "${green}Start Mountebank ...${reset}"
mb --allowCORS &

echo "${green}Setup Mountebank ...${reset}"
node mountebank-server/setup-imposters.js

echo "${green}Run ember test ...${reset}"
ember test -c ./testem-ci.json > temp.xml
if [ $? -eq 0 ];then
  sed '1,4d' temp.xml > test-result.xml
  mb stop
  echo "${green}Ember test finished successfully.${reset}"
  echo "${green}Start ember server.${reset}"
  ember server -e ci &
  var=$!
  echo "${green}Ember server pid is $var${reset}"
  echo "${green}Run lettuce ...${reset}"
  lettuce python-webdriver-tests/features --tag complete --with-xunit

  if [ $? -eq 0 ];then
  result=0
  fi

  echo "${green}Shutdown ember server at pid $var.${reset}"
  kill $var
else
  echo "${red}Ember test or selenium test failed.${reset}"
fi

echo "${green}Shutdown Mountebank ...${reset}"
rm temp.xml
exit $result
