var request = require('request');

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

exports.getExample = function(req, res){

    var headers = {
        'X-Requested-Auth': 'Digest',
        'X-Opencast-Matterhorn-Authorization': 'true'
    };

    var options = {
        url: 'http://beuthbox.beuth-hochschule.de/api',
        headers: headers,
        auth: {
            'user': 'opencast_system_account',
            'pass': 'CHANGE_ME'
        }
    };
    request(options, function(error, response, body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    });

};