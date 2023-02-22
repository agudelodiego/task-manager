FROM node

RUN mkdir -p /home/taskmanager
WORKDIR /home/taskmanager/
COPY . .
RUN npm i
RUN npm run build
RUN rm -rf ./src

EXPOSE 3000

CMD [ "npm", "run", "start" ]




