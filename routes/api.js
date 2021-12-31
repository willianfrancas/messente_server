const express = require('express');
const SMSController = require('../controller/SMSController');
const TelegramController = require('../controller/TelegramController');

const router = express.Router();

router.post('/sms', SMSController.sendSMS);
router.post('/telegram', TelegramController.sendTelegramMessage);

module.exports = router;
