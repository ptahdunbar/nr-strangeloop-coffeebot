# pull official base image
FROM node:lts-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]