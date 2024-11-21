const register = require('../Models/signUp'); 
const camp = require('../Models/camp')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const organisations = require('../Models/signUp');


async function addOrganisation(req, res, next) {
    try {
       
        const {
            organisationName, streetAddress, city,  district, block, zipCode, state, email, contact,password 
        } = req.body;

        if (
            !organisationName || !streetAddress || !city || !district ||
            !block || !zipCode ||!state || !email || !contact || !password
        ) {
            return res.status(400).json({
                status: 'Error',
                language: 'en-US',
                message: 'All fields are required.',
            });
        }

        const existingOrg = await register.findOne({ email });
        if (existingOrg) {
            return res.status(400).json({
                status: 'Error',
                language: 'en-US',
                message: 'Email is already registered.',
            });
        }

        const organisationId = uuidv4();
        const hashedPassword = await bcrypt.hash(password,5);
        const organisation = new register({
            organisationName,
            address: {
                streetAddress, city, district, block, zipCode, state,
            },
            email,
            contact,
            oid: organisationId,
            password: hashedPassword,
        });

       
        const addOrg = await organisation.save();

        const token = jwt.sign(
            { id: organisation._id, email: organisation.email },
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
          );

        res.status(201).json({
            status: 'Success',
            language: 'en-US',
            data: addOrg,
            token: token,
            message: 'Organization registered successfully.',
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'Error',
            language: 'en-US',
            message: 'Internal server error.',
            error: error.message,
        });
    }
}


async function loginOrgnisation(req, res, next) {
  try {
    console.log("Request body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required.',
        statusCode: 400
      });
    }

    const user = await register.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: 'User not found.',
        statusCode: 404
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials.',
        statusCode: 401
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret', 
      { expiresIn: '7d' } 
    );
    res.status(200).json({
      status: "Success",
      language: 'en-US',
      message: 'Login successful',
      token: token,
      user: user,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
        status: "Error",
        language: 'en-US',
        error: error.message,
    });
  }
}


async function getLoginUser(req, res, next){
   try{
    const user = req.user
    const userId = user.id


    const loginUser = await organisations.findOne({_id: userId})
    console.log('login-user', loginUser)

  res.status(200).json({
            status: "Success",
            language: 'en-US',
            message: 'get login user succesfully !!',
            data: loginUser
        });
   }catch(err){
    console.error('Error:', error);
        res.status(500).json({
            status: "Error",
            language: 'en-US',
            error: error.message,
        });
   }

}

async function createCamp(req, res, next) {
    console.log('authantication', req.user)
    
}

module.exports = { addOrganisation, loginOrgnisation, getLoginUser, createCamp };
