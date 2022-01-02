const MessenteApi = require('messente_api');

const SMSController = {

    sendSMS: async (req, res) => {
        const { fromNumber, toNumber, textMessage } = req.body;

        const defaultClient = MessenteApi.ApiClient.instance;
        const basicAuth = defaultClient.authentications['basicAuth'];
        basicAuth.username = process.env.MESSENTE_USER;
        basicAuth.password = process.env.MESSENTE_PWD;

        const api = new MessenteApi.OmnimessageApi();

        const sms = MessenteApi.SMS.constructFromObject({
            sender: fromNumber,
            text: textMessage,
        });

        const omnimessage = MessenteApi.Omnimessage.constructFromObject({
            messages: [sms],
            to: toNumber,
        });

        api.sendOmnimessage(omnimessage, (error, data) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ', data);
            }
        });
    },
}
module.exports = SMSController;
