FROM node:15.13-alpine
WORKDIR /go_with_flow
COPY . /go_with_flow
RUN npm run build
CMD [ "npm", "start" ]
