FROM node:0.12

#
# TODO: ideally this would build from the output of npm pack and not
# install all the build and test tools nor run tests.
#

expose 3000

ADD lib /app/lib
ADD tests /app/tests
ADD bin /app/bin
ADD src /app/src
ADD files /app/files
ADD *.js /app/
ADD package.json /app/
RUN cd /app && npm install
RUN cd /app && npm run build
CMD cd /app && npm start

