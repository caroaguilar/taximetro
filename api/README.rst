Taximetro API
=============

1) Install MySQL, Python 3 and Pip:

    sudo apt-get install python3 mysql-server-5.6
    wget https://bootstrap.pypa.io/get-pip.py
    sudo python3 get-pip.py

2) Install dependencies:

    sudo pip3 install -r requirements.txt

3) Create data schema and data.

    pushd data
    python3 extractor.py
    popd

4) Create user and database:

    $ mysql -u root -p
    mysql> source schema_and_data.sql;
    mysql> GRANT ALL PRIVILEGES ON taximetro.* TO 'taximetro'@'localhost' IDENTIFIED BY 'taximetro';
    mysql> FLUSH PRIVILEGES;

4) Run API:

    FLASK_APP=taximetro.py python3 -m flask run


Note: In case you require to inspect the database you can get it from:

    http://datos.ctp.go.cr/dashboards/9261/taxis/

   The database can be downloaded as CSV using the following url:

    http://datos.ctp.go.cr/rest/datastreams/91182/data.csv
