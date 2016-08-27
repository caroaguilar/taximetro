# -*- coding: utf-8 -*-

from os import getcwd
from json import dumps
from csv import DictReader
from os.path import basename, join, isfile

from requests import get


DATA_URI = 'http://datos.ctp.go.cr/rest/datastreams/91182/data.csv'
HEADERS = [
    '"Placa"', '"Apellido1"', '"Apellido2"', '"Nombre"', '"Cédula"',
    '"Base Operacion"', '"Tipo Servicio"'
]
HEADER_KEYS = [
    'plate', 'lastname1', 'lastname2', 'name', 'idnum', 'base', 'service'
]
TITLE_KEYS = [
    'lastname1', 'lastname2', 'name', 'base', 'service'
]


def download_file(url, outfile):
    filestream = get(url, stream=True)

    with open(outfile, 'wb') as fd:
        for chunk in filestream.iter_content(chunk_size=1024):
            if chunk:
                fd.write(chunk)

    return outfile


def format_sql_insert(row):
    """
    Row is in the form:

    {'base': '000000 - Am San José',
     'idnum': '6-0244-0418',
     'lastname1': 'Apuy',
     'lastname2': 'Gonzalez',
     'name': 'Gerardo',
     'plate': 'TSJ-000138',
     'service': 'Sedan'}
    """
    return (
        'INSERT INTO `taxi` '
        '(base, idnum, lastname1, lastname2, name, plate, service) VALUES '
        '("{base}", "{idnum}", "{lastname1}", "{lastname2}", '
        '"{name}", "{plate}", "{service}");'
    ).format(**row)


def main():

    # Download data file if required
    data_file = join(getcwd(), basename(DATA_URI))
    if not isfile(data_file):
        print('Downloading {} ...'.format(DATA_URI))
        download_file(DATA_URI, data_file)
        print('File saved to {}'.format(data_file))

    # Read CSV data
    bad_data = []
    good_data = []

    with open(data_file, 'r') as infd:
        headers = infd.readline().strip().split(',')
        assert headers == HEADERS, 'Fatal: Data source changed.'

        reader = DictReader(infd, fieldnames=HEADER_KEYS)

        for data_row in reader:

            # Check for bad data in the set
            if not all(data_row[key] for key in ['plate', 'idnum', 'name']):
                bad_data.append(data_row)
                continue

            # Change data presentation
            for key in TITLE_KEYS:
                data_row[key] = data_row[key].title()
            good_data.append(data_row)

    # Write and report bad data
    if bad_data:
        print('WARNING: Found {} bad entries.'.format(len(bad_data)))

        bad_data_file = join(getcwd(), 'bad.json')
        with open(bad_data_file, 'w') as badfd:
            badfd.write(dumps(bad_data, indent=4))

        print('Bad data entries saved to {}'.format(bad_data_file))

    # Grab database schema
    with open('schema.sql', 'r') as fd:
        schema = fd.read()

    data_spot = schema.find('SET SQL_MODE=@OLD_SQL_MODE;')
    schema_header = schema[:data_spot]
    schema_footer = schema[data_spot:]

    # Write final schema
    schema_and_data = join(getcwd(), 'schema_and_data.sql')
    print('Writing schema, please wait...')

    with open(schema_and_data, 'w') as fd:
        fd.write(schema_header)
        fd.write('-- BEGIN INSERT DATA\n\n')
        fd.write('SET AUTOCOMMIT=0;\n')
        for row in good_data:
            fd.write(format_sql_insert(row))
            fd.write('\n')
        fd.write('COMMIT;\n')
        fd.write('\n\n-- END INSERT DATA\n\n')
        fd.write(schema_footer)

    print('Database schema and data written to {}'.format(schema_and_data))


if __name__ == '__main__':
    main()
