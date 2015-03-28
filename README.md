coinbase-node-demo
=========

**_under construction_**

**_under construction_**

**_under construction_**

Written to demonstrate the coinbase-node Node.js package.

In the process of creating the demo I tried to get caught up on node web development so I use some libraries and tools here that make the system too complicated to be a good reference use of the API.  But regardless, it all works for me and I learned a lot.

The demo uses the following build tools and libraries:

* gulp
* react.js
* expressjs
* jade
* sass
* bootstrap
* connect-redis
* intern
* travis-ci
* docker

and of coarse coinbase-node.

## Quick Start

### from src

from a computer that has node 0.12 and npm 2.x installed:

1. go to coinbase and define an application, creating a CLIENT_ID and a CLIENT_SECRET
2. install and start redis - on osx `brew install redis`
3. install gulp `npm install -g gulp`
4. cd into a clone of this repo and `npm install`
5. run the command:

```
REDIS_HOST=<YOUR_REDIS_HOST> CLIENT_ID=<YOUR_CLIENT_ID> CLIENT_SECRET=<YOUR_CLIENT_SECRET> REDIR_URL=http://localhost:3000/callback gulp live
```

### from Docker

from a computer that has docker v1.2+

blah blah blah blah

