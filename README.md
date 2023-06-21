
# Getting started with docker-compose file

This project starts with [docker-compose up --build] command which will check for the docker-compose file in the current folder.

# docker-compose file script

It has the script to run several services which includes frontend, backend, redis image, postgres image.

# nginx folder

This is used for production use since i'll be redirecting the web application request in nginx container.

# daphne

Need to add/bind daphne to django port for production setup since we are using daphne for WebSocket connection.
This is done in the backend service in yml file.

# Digital Ocean droplet creation
private/public key creation:

1.In terminal - ssh-keygen
2.Add passphrase - digitaldroplet

if cannot be connected to digital ocean server:
(You should have a keygen in your localhost)
    eval "$(ssh-agent -s)" // to give access for public key
    ssh-add ~/.ssh/id_rsa
    ssh root@ip

# postgres copying data from host to container
// use pg_dump :
    pg_dump -U <username> -h localhost dating_app > dating_app_backup.sql
// after running yml file :
    docker cp backup.sql react-drf-datingapp-koode_db_1:/tmp/           
// above code is to transfer any file into the docker container //
    docker exec -it react-drf-datingapp-koode_db_1 bash
    psql -U postgres -d dating_app -f /tmp/dating_app_backup.sql
// above code is to make new tables in the postgres based on the file which was copied from the localhost

# Nginx configuration
1. we create nginx in a different container with react build file
2. Connect local nginx conf file to the nginx container
    . we will specify where to be redirected if client requests our url
    . i.e; if url ends with '/' then it will be redirected to nginx react build file
    . and if url ends with '/api/' then it will be redirected to django container
    . if url ends with 'media', then request will be redirected to mediafiles created inside nginx container which is actually referencing to django media files which we mentioned through yml file.
    . we will also write the port to forward when ws connection is needed 

// basic Info
1. To remove docker images - 
    docker rmi -f $(docker images -a -q)
2. Server side git ssh- Your public key has been saved in /root/.ssh/id_ed25519.pub
.passphrase - entergit