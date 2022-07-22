FROM python:3.10
WORKDIR /code
RUN python -m pip install -U pip setuptools wheel
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/