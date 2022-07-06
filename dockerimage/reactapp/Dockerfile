FROM node:18

RUN npm install -g npm@8.12.2

WORKDIR /home/node/app

COPY ["package.json", "package-lock.json", "/home/node/app/"]
# Quiero que me copie esos dos archivos al destino final

RUN npm install
# Yo quiero que se corra esto cuando cambie una dependencia 

RUN mkdir public src

#COPY ["./public", "/home/node/app/public"]
#COPY ["./src", "/home/node/app/src"]
# Ahora si copio el resto de los archivos

#WORKDIR /home/node/app

#EXPOSE 3000

#CMD ["npm", "start"]