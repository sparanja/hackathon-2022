# hackathon-2022
This project is a Django API server with integrated Postgresql DB for Offensive Ads Flagger application \n

Steps to setup local environment: <br></br>
-> Clone the master into local. <br></br>
-> Open project using an IDE of your choice(eg. Pycharm) <br></br>
-> Project has been compiled with Python 3.7 and requires Django 3.4 and above <br></br>
-> Recommend using Python 3.7 and setting up a python virtual environment using pyenv -> https://realpython.com/intro-to-pyenv/ <br></br>

```
# install 3.7.10 (on M1 this should work just fine)
pyenv install 3.7.10
# set 3.7.10 as the version for the project
pyenv local 3.7.10
```

-> Set the Project Interpreter to the virtual environment you created on the IDE under Pycharm > Preferences:<br></br>
    ![image](https://user-images.githubusercontent.com/43121486/180129423-98663a2e-df92-4927-bc56-30021dccde47.png) <br></br>

-> After setting up virtual environment run <br></br>
            pip install requirement.txt <br></br>
-> In the project root directory i.e hackathon-2022 run this command to initialize Postgresql Database: <br></br>
            docker-compose up -d <br></br>
-> Once database is up and running verify it on the Databases tab: <br></br>
    ![image](https://user-images.githubusercontent.com/43121486/180129563-1b83598c-bc99-4be9-beb4-d98d72c769fa.png) <br></br> 
-> Run these commands (migrations) to automatically create example tables in the database, run these from root directory: <br></br>
            python manage.py makemigrations offensiveAdsFlagger (Creates models for the app) <br></br>
            python manage.py migrate (Creates tables in the database) <br></br>
-> Run the Web server using the Run tab: <br></br>
    ![image](https://user-images.githubusercontent.com/43121486/180129951-1040afab-900e-4a85-a45e-f9b4386223b8.png) <br></br>
-> Access the Web server by calling the example API from postman: \n
    ![image](https://user-images.githubusercontent.com/43121486/180130060-2ba9dd25-716c-493f-b6af-cf4a5b189ca5.png) <br></br>

Other important resources: <br></br>
1. https://stackoverflow.com/questions/46696518/django-db-utils-programmingerror-relation-bot-trade-does-not-exist (Django migrations) <br></br>
2. https://docs.djangoproject.com/en/4.0/intro/tutorial01/ <br></br>
