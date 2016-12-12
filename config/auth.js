module.exports = {

    'facebookAuth' : {
        'clientID'      : '1712941565700613', // your App ID
        'clientSecret'  : '3cfe2e0f31595a3efdb7cf6e2603641b', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
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
