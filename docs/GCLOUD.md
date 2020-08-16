# VM Instances

- Access
    - Create ssh keys
    - Add public key to VM
    - `ssh` to VM using private key from key pair

- Bootstrap
    - Install docker https://docs.docker.com/engine/install/ubuntu/
    - Install let's encrypt https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-16-04

- Run
    - `docker run --env-file $PWD/.env ralston3/grabbit:latest make start_dev`
