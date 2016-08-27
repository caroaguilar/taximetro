from os import getcwd
from json import dumps
from csv import DictReader
from os.path import basename, join, isfile
from pprint import pprint

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


def main():

    # Download data file if required
    data_file = join(getcwd(), basename(DATA_URI))
    if not isfile(data_file):
        print('Downloading {} ...'.format(DATA_URI))
        download_file(DATA_URI, data_file)
        print('File saved to {}'.format(data_file))

    # Read CSV data
    bad_data = []

    with open(data_file, 'r') as infd:
        headers = infd.readline().strip().split(',')
        assert headers == HEADERS, 'Fatal: Data source changed.'

        reader = DictReader(infd, fieldnames=HEADER_KEYS)

        for data_row in reader:

            # Check for bad data in the set
            if not data_row['plate']:
                bad_data.append(data_row)
                continue

            # Change data presentation
            for key in TITLE_KEYS:
                data_row[key] = data_row[key].title()
            pprint(data_row)

    bad_data_file = join(getcwd(), 'bad.json')
    with open(bad_data_file, 'w') as badfd:
        badfd.write(dumps(bad_data, indent=4))


if __name__ == '__main__':
    main()
