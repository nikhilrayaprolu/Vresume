module.exports = {

    'facebookAuth' : {
        'clientID'      : '497491945444-819npjqbbj5l9b2toutsijcj14h3rg1r.apps.googleusercontent.com', // your App ID
        'clientSecret'  : 'Ojxn7RoIAs9cRzxX4NrUBga7', // your App Secret
        'callbackURL'   : 'http://localhost:4200/auth/facebook/callback/'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8082/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8082/auth/google/callback'
    }

};
