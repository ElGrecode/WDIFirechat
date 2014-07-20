#WDIFirechat
This is a sandbox I was thinking we could use as a public profile of our cohort as well an open source way for all of us to contribute towards customizing our own chat board.

#Installation
This was built using Yeoman, so it first requires some dependencies. Among them are bower to pull dependencies locally, grunt to for automating tasks and local server development, as well as npm to install bower components.

If that didn't make much sense. It's ok. It doesn't make a lot of sense to me either. The first thing you need to do is make sure that node is installed. 

##Node installation
###brew install node
This is the easiest way to make sure that npm is installed. If this is working a "node -v" should result in showing your current version

##Local components
You will first need to run an "npm install" in your local repository.
Then you will need to run a "bower install" this should pull the necesary dependencies that will make the local repository work

##Running a server
With grunt installed you should have access to a local server. Using
###grunt serve
will allow you to use the repository and automatically watch for changes to files and then livereload them on the page automatically. When you run this command it is automatically configured to open a port and display the web page. Feel free to play around.

##Access to Firebase
The login credentials to see what is going on in firebase will be written on a wall somewhere in class.

###Deuces