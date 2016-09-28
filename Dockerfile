FROM ubuntu

MAINTAINER Gabriella Querales gabriella.querales@appdynamics.com)

################## BEGIN INSTALLATION ######################

# Update the repository sources list
RUN apt-get update

# Install npm
RUN \ 
    apt-get install -y wget && \
    apt-get install -y redis-server && \
    apt-get install -y vim && \
    cd /opt && \
    wget http://nodejs.org/dist/v0.10.40/node-v0.10.40-linux-x64.tar.gz && \
    tar -xzf node-v0.10.40-linux-x64.tar.gz && \
    mv node-v0.10.40-linux-x64 node && \
    cd /usr/local/bin && \
    ln -s /opt/node/bin/* . && \
    rm -f /opt/node-v0.10.40-linux-x64.tar.gz

COPY ./package.json /app/package.json
RUN cd /app && \
    npm install    

COPY . /app

EXPOSE 3000

CMD cd /app && node mobileFront.js
