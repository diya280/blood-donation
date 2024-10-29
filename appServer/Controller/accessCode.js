const customError = require('../../utils/customError');
const accessCodeCache= require('../../utils/accessCodeCache')




exports.generateId = function (req, res, next) {
    try {
        const currentTime = new Date();
        const timestamp = currentTime.getTime().toString();
        const randomValue = Math.random().toString(16).substring(2, 8);
        const uniqueId = `UID${timestamp}${randomValue}${generateUniqueCounter()}`;
        return uniqueId;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}
