
# Getting started with docker-compose file

This project starts with [docker-compose up --build] command which will check for the docker-compose file in the current folder.

# docker-compose file script

It has the script to run several services which includes admin, adminOld, frontend, backend, redis image.

# ins_key.pem file

Used to connect to aws instance

# nginx folder

This is used for production use since i'll be pushing it to github.

# Gunicorn

Need to add gunicorn to django requirements for production setup





# How to set postgres in the server
1.sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -sc)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
2.wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
3.sudo apt-get update
4.sudo apt-get install postgresql-12 libpq-dev
5.sudo -u postgres psql
6.CREATE DATABASE dating_app;
7.ALTER USER postgres PASSWORD 'asdf';

# Digital Ocean droplet creation
    private/public key creation:
1.In terminal - ssh-keygen
2.Add passphrase - digitaldroplet

    connect to droplet
1.ssh root@ip
2.eval "$(ssh-agent -s)" // to give access for public key
3.ssh-add ~/.ssh/id_rsa
4.ssh root@ip

// I CURRENTLY CHANGED THE YML FILE I.E; BACK END NETWORK_MODE CHANGED TO DELETED AS NGINX NEEDED TO LISTEN TO BACKEND //

// THEN I CHANGED THE REACT FILE WITH CONSTANTS BASE_URL CHANGED TO WITHOUT 8000 AS NGINX IS LISTENING TO 80 PORT //

# postgres copying data from host to container
use pg_dump :
        pg_dump -U <username> -h localhost dating_app > dating_app_backup.sql
1. after running yml file
    . docker cp dating_app_backup.sql react-drf-datingapp-koode_db_1:/tmp/           #this is to transfer local database into the container
    . docker exec -it react-drf-datingapp-koode_db_1 bash
    . psql -U postgres -d dating_app -f /tmp/dating_app_backup.sql

# Nginx configuration
. we create nginx in a different container with react build file
. Then we will connect our nginx conf file to the container where:
    . we will be writing listening port 80
    . also we will specify where to be redirected if client requests our url
    . i.e; if url ends with '/' then it will be redirected to nginx react build file
    . and if url ends with '/api/' then it will be redirected to django container
    . if url ends with 'media', then we will redirect to mediafiles created inside nginx container which is actually referencing to django media files which we mentioned through yml file.
    . we will also write the port to forward when ws connection is needed by starting daphne at port 8000
    . 


# to remove docker images - docker rmi -f $(docker images -a -q)