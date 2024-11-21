// const customError = require('../../utils/customError');
// const accessCodeCache= require('../../utils/accessCodeCache')
// const microSecretKey = process.env.profileMsKey;




// const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1]; 
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decodedToken; 


//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };


// module.exports = authMiddleware;




const jwt = require('jsonwebtoken');
const customError = require('../utils/customError');

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



const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decodedToken; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

module.exports = authMiddleware;
