 #! /bin/bash
 if [ ! -f /home/vagrant/already-installed-flag ]
 then
   echo "GENERAL APT-GET UPDATE"
   apt-get -qq update
   echo "INSTALL NODEJS"
   apt-get -qq install -y python-software-properties python g++ make
   apt-get -qq install software-properties-common
   apt-get update
   add-apt-repository ppa:chris-lea/node.js
   apt-get update
   apt-get -qq install nodejs
   node –-version
   echo "INSTALL NPM"
   apt-get -qq -y install npm
   echo "INSTALL GIT"
   apt-get -qq -y install git
   echo "INSTALL VIM"
   apt-get -qq -y install vim
   echo "Done!"
 else
   echo "already installed flag set : /home/vagrant/already-installed-flag"
 fi