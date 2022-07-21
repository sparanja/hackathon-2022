# hackathon-2022

This project is a Django API server with integrated Postgresql DB for Offensive Ads Flagger application \n

## Local Environment Setup
1. Clone the master into local.
2. Open project using an IDE of your choice(eg. Pycharm)
3. Project has been compiled with Python 3.10 and requires Django 3.2 and above

> **Note** it's recommend to Python 3.10, and to set up a python virtual environment using pyenv.
> Example blog post can be found [here](https://realpython.com/intro-to-pyenv/)

```
# pyenv local 3.10.3 (on M1 this should work just fine)
pyenv install 3.10.3

# set 3.10.3 as the version for the project
pyenv local 3.10.3

# confirm that you're using 3.10.3
python --version

# create virtual environment
python -m venv .venv

# activate virtual environemt
source .venv/bin/activate

# upgrade some base packages
python -m pip install -U pip setuptools wheel

# install dependencies
pip install -r requirements.txt

```


## Runnig Docker

This will spin up the database and any other related services

```
docker-compose up -d
```

You can also verify that the app is up by checking the docker logs

```
docker logs db
```

If you're using Pycharm you can verify that the database is up and running on the Databases tab
![image](https://user-images.githubusercontent.com/43121486/180129563-1b83598c-bc99-4be9-beb4-d98d72c769fa.png)


## Running The App

See the [Pycharm users](#pycharm-users) section for alternative ways to run the app with pycharm.

```
# if its your first time running the app make sure to run migrations
python manage.py makemigrations
python manage.py migrate

# spin up the app running on localhost:8000
python manage.py runserver
```

To verify the app is up and running open up a web browser and head to `http://localhost:8000/health`


###  Pycharm users

#### Virtual Environment
Set the Project Interpreter to the virtual environment you created on the IDE under Pycharm > Preferences:
    ![image](https://user-images.githubusercontent.com/43121486/180129423-98663a2e-df92-4927-bc56-30021dccde47.png)

#### Loading Test Data
In root folder run python3 manage.py loaddata mydata.json.gz
Test data for users should be loaded into auth_user table
Test data for ads should be loaded into offensiveAdsFlagger_examplemodel

#### Running The APP
Run the Web server using the Run tab:
    ![image](https://user-images.githubusercontent.com/43121486/180129951-1040afab-900e-4a85-a45e-f9b4386223b8.png)

Access the Web server by calling the example API from postman: \n
    ![image](https://user-images.githubusercontent.com/43121486/180130060-2ba9dd25-716c-493f-b6af-cf4a5b189ca5.png)


### Other important resources
1. https://stackoverflow.com/questions/46696518/django-db-utils-programmingerror-relation-bot-trade-does-not-exist (Django migrations)
2. https://docs.djangoproject.com/en/4.0/intro/tutorial01/
