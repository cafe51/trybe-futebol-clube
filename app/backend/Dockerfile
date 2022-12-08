FROM node:16.14-alpine
WORKDIR /app-backend
EXPOSE 3001
COPY . .
RUN npm install

ENTRYPOINT ["npm", "run"]
CMD ["dev"]

# RUN sleep 30

# FROM node:16.14-alpine
# WORKDIR /app-backend
#  ...

