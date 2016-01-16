# Smart Mirror

## Config Files

### Reddit
To use the reddit component place the a "redditConfig.js" in the config folder with the following contents

```
export default {
    userAgent: '', // unique string identifying the app
    oauth: {
        type: 'script',
        key: '', // OAuth client key (provided at reddit app)
        secret: '', // OAuth secret (provided at reddit app)
        username: '', // Reddit username used to make the reddit app
        password: '', // Reddit password for the username
        // The OAuth scopes that we need to make the calls that we
        // want. The reddit documentation will specify which scope
        // is needed for evey call
        scope: [ 'identity', 'read', 'vote' ]
    }
};
```

### Hue
You'll have to add a proper valid user to interact with the hue bridge, just replace the following you're unique user id

```
...
bridgeUser: "1bced2662f3595643baf3cb284cf4df",
...
```

## Install

Just run the following commands

```
npm install
```

To dev use the following

```
gulp watch
```

To run in production, you'll have to generate a self signed cert and point them in app.js

```
...
https.createServer({
        key: fs.readFileSync("PATH/TO/KEY.PEM"),
    cert: fs.readFileSync("PATH/TO/CERT.PEM")
}, app).listen(3000);
...
```

Once thats done just run the following command:

```
node app.js
```

## Problems

### Isn't semantic ui super overkill?

Yes 100%, this does need to change!!!!

### Whats going on with https and hue?

Lets just say that hue doesn't have an api that interfaces with https, you can just load the unsafe scripts (bad hack) or enable the flag in chromium
