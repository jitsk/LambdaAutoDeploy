'use strict';
 var http = require('http');
console.log('Loading function');

exports.handler = (event, context, callback) => {
    const message = event.Records[0].Sns.Message;
    const repo = JSON.parse(message).repository.name;
    const url = encodeURIComponent(JSON.parse(message).repository.git_url);
    console.log('From SNS:', url);
    var stage = 'dev';
    if(repo === 'lambda') {
        stage = 'prod';
    }
    http.get(EC2_ADDRESS + url + "/" +stage, function(response) {
        console.log(response.statusCode);
    });
    callback(null, message);
};

