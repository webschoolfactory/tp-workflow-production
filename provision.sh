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
   echo "INSTALL NPM"
   apt-get -qq -y install npm
   echo "INSTALL MONGODB"
   apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
   echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
   apt-get update
   apt-get install mongodb-10gen
   echo "INSTALL GIT"
   apt-get -qq -y install git
   echo "INSTALL VIM"
   apt-get -qq -y install vim
   echo "INSTALL NPM MODULES"
   npm config set tmp='/tmp'
   npm install -g grunt-cli bower karma
   echo "SET DB PATH"
   mkdir /data/
   mkdir /data/db
   chmod 777 /data/db
   echo "NPM INSTALL"
   cd /vagrant && npm install --no-bin-links 
   echo "Done!"
 else
   echo "already installed flag set : /home/vagrant/already-installed-flag"
 fi