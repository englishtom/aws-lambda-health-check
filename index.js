const axios = require('axios');
const https = require('https');

const HOSTNAME    = 'example.com';
const INTERNAL_IP = 'https://192.168.0.1';

exports.handler = async (event, context, callback) => {

    function onSuccess() {
        callback(null, 'Success');
    }

    function onError() {
        callback('Failure', null);
    }

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    const args = {
        headers: {
            'Host': HOSTNAME
        },
        httpsAgent: agent
    }

    try {
        const success = await axios.get(INTERNAL_IP, args);
        return onSuccess();
    } catch(err) {
        return onError();
    }

}

