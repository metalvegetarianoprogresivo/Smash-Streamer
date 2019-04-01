FROM node:8.15-alpine

WORKDIR /usr/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .


# Debugging port
EXPOSE 9229

# Server port 
EXPOSE 3010

# UI port
EXPOSE 3000 

CMD ["npm", "run:pm2"]