Taximetro Web
=============

1) If developing local, configure your hosts file:

   $ cat /etc/hosts
   127.0.0.1   localhost   taximetro.co.cr

2) Install node:

   On Mac:

       brew install node

   On Ubuntu:

       curl -sL https://deb.nodesource.com/setup_4.x | sudo bash -
       sudo apt-get install nodejs

3) Install React:

    npm install --save react react-dom

4) Install dependencies:

    npm install

5) Build and run the webpage:

    npm start

After this, you are able to see the page in your browser by opening:

    http://taximetro.co.cr:3000
