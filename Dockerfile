FROM node:10.15.1

WORKDIR /usr/src/smart-brain-api

COPY ./ ./

RUN npm install -g nodemon

RUN npm install

CMD ["/bin/bash"]