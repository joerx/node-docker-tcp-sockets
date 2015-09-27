FROM node:0.12
MAINTAINER Jörg Henning "henning.joerg@gmail.com"

# expose port so it will be exposed to a linked client
EXPOSE 4000

ADD . /src
WORKDIR /src
CMD ["node", "."]
