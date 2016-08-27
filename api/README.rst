Taximetro API
=============

1) Install Python 3 and Pip:

    sudo apt-get install python3
    wget https://bootstrap.pypa.io/get-pip.py
    sudo python3 get-pip.py

2) Install dependencies:

    sudo pip3 install -r requirements.txt

3) Run API:

    FLASK_APP=taximetro.py python3 -m flask run

4) In case you require to inspect the database you can get it from:

    http://datos.ctp.go.cr/dashboards/9261/taxis/

   The database can be downloaded as CSV using the following url:

    http://datos.ctp.go.cr/rest/datastreams/91182/data.csv

