# hackathon-2022
This project is a Django API server with integrated Postgresql DB for Offensive Ads Flagger application

Steps to setup local environment:
-> Clone the master into local.
-> Open project using an IDE of your choice(eg. Pycharm)
-> Project has been compiled with Python 3.7 and requires Django 3.4 and above
-> Recommend using Python 3.7 and setting up a python virtual environment using pyenv -> https://realpython.com/intro-to-pyenv/
-> Set the Project Interpreter to the virtual environment you created on the IDE under Pycharm > Preferences:
    ![image](https://user-images.githubusercontent.com/43121486/180129423-98663a2e-df92-4927-bc56-30021dccde47.png)

-> After setting up virtual environment run 
            pip install requirement.txt
-> In the project root directory i.e hackathon-2022 run this command to initialize Postgresql Database:
            docker-compose up -d
-> Once database is up and running verify it on the Databases tab:
    ![image](https://user-images.githubusercontent.com/43121486/180129563-1b83598c-bc99-4be9-beb4-d98d72c769fa.png)
-> Run these commands (migrations) to automatically create example tables in the database, run these from root directory:
            python manage.py makemigrations offensiveAdsFlagger (Creates models for the app)
            python manage.py migrate (Creates tables in the database)
-> Run the Web server using the Run tab:
    ![image](https://user-images.githubusercontent.com/43121486/180129951-1040afab-900e-4a85-a45e-f9b4386223b8.png)
-> Access the Web server by calling the example API from postman:
    ![image](https://user-images.githubusercontent.com/43121486/180130060-2ba9dd25-716c-493f-b6af-cf4a5b189ca5.png)

Other important resources:
1. https://stackoverflow.com/questions/46696518/django-db-utils-programmingerror-relation-bot-trade-does-not-exist (Django migrations)
2. https://docs.djangoproject.com/en/4.0/intro/tutorial01/
