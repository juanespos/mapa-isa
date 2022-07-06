FROM ubuntu:latest

RUN apt-get update

RUN apt-get install -y --no-install-recommends openjdk-8-jdk
RUN apt-get install -y --no-install-recommends openjdk-8-jre

WORKDIR /usr/share

RUN mkdir geoserver

#COPY ["./geoserver", "/usr/share/geoserver"]

WORKDIR /usr/share/geoserver

RUN echo "export GEOSERVER_HOME=/usr/share/geoserver" >> ~/.profile
RUN . ~/.profile

WORKDIR /usr/share/geoserver/data_dir

RUN mkdir _capasIsa

#COPY ["./_capasIsa", "/usr/share/geoserver/data_dir/_capasIsa"]

#WORKDIR /usr/share/geoserver/bin

#CMD ["sh", "/usr/share/geoserver/bin/startup.sh"]