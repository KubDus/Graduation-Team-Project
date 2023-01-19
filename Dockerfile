FROM node:16.14
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "start"]


# # accept the port argument
# ARG PORT=3000

# # accept the HOMEDIR argument
# ARG HOMEDIR="/usr/src/app"

# # create the app folder
# RUN mkdir -p ${HOMEDIR}

# # set the app folder to be the work directory
# WORKDIR ${HOMEDIR}

# # copy the package.json to the work dir
# COPY package.json .

# # install dependencies based on the environment
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi

# # copy the rest of the files
# COPY . ./

# # expose the specified port
# EXPOSE ${PORT}

# # run the start command from package.json
# # the command instructions in docker-compose file can override this 
# CMD ["npm", "start"]