const register = require('../Models/signUp'); 
const camp = require('../Models/camp')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const organisations = require('../Models/signUp');
const attendees = require('../Models/attendees')

async function addOrganisation(req, res, next) {
    try {
       
        const {
            organisationName, streetAddress, city,  district, block, 
            zipCode, state, email, contact,password } = req.body;

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
        let existingOrg;

        existingOrg = await register.findOne({ email });
        if (existingOrg) {
            return res.status(400).json({
                status: 'Error',
                language: 'en-US',
                message: 'Email is already registered.',
            });
        }

         existingOrg = await register.findOne({ contact });
        if (existingOrg) {
            return res.status(400).json({
                status: 'Error',
                language: 'en-US',
                message: 'Contact is already registered.',
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
            message: 'Erron in signup, try after sometime',
        });
    }
}

async function loginOrgnisation(req, res, next) {
  try {
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
        statusCode: 404, 
        message:'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials.',
        statusCode: 401,
        message: 'Incorrect password'
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
        message: 'Error in organisation login'
    });
  }
}

async function getLoginUser(req, res, next){
   try{

    const userId = req.user.id
    if (!userId) {
        return res.status(400).json({
          status: 'Error',
          language: 'en-US',
          message: 'Id is required.',
        });
      }
    const loginUser = await organisations.findOne({_id: userId})
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
  try {
      const {
          date, title, streetAddress,
          city, district, block, zipCode,
          state, contact } = req.body;

      if (!date || !title || !streetAddress || !city ||
          !district || !block || !zipCode || !state || !contact) {
          return res.status(400).json({
              status: 'Error',
              language: 'en-US',
              message: 'All fields are required.',
          });
      }

      if (!req.user || !req.user.id) {
          return res.status(401).json({
              status: 'Error',
              language: 'en-US',
              message: 'Unauthorized: User ID not found.',
          });
      }

      const campId = req.user.id;
      
      const orgCamp = new camp({
          date,
          title,
          address: {
              streetAddress,
              city,
              district,
              block,
              zipCode,
              state,
          },
          contact,
          createdId: campId ,
      });

      const addCamp = await orgCamp.save();

          res.status(201).json({
          status: 'Success',
          language: 'en-US',
          data: addCamp,
          message: 'Camp added successfully!',
      });
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json({
          status: "Error",
          language: 'en-US',
          error: err.message,
      });
  }
}

async function getCampById(req, res, next) {
    try{
        const campId = req.user.id
        if (!campId) {
            return res.status(400).json({
              status: 'Error',
              language: 'en-US',
              message: 'Id is required.',
            });
          }

        const camps = await camp.find({createdId: campId})
           res.status(201).json({
            status: 'Success',
            language: 'en-US',
            data: camps,
            message: 'get camp by id successfully!',
        });
    }catch(err){
        console.error('Error:', err);
      res.status(500).json({
          status: "Error",
          language: 'en-US',
          error: err.message,
      }); 
    }
}

// async function getAllCamps(req, res, next) {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(400).json({
//         status: 'Error',
//         language: 'en-US',
//         message: 'User ID is required.',
//       });
//     }

//     const campData = await camp.find({ createdId: { $ne: userId } });
//     res.status(200).json({
//       status: 'Success',
//       language: 'en-US',
//       data: campData,
//       message: 'Get all camps successfully!',
//     });
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({
//       status: 'Error',
//       language: 'en-US',
//       error: err.message,
//     });
//   }
// }


async function getAllCamps(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        status: 'Error',
        language: 'en-US',
        message: 'User ID is required.',
      });
    }

    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 6;
    const skip = (page - 1) * size;

    const totalCamps = await camp.countDocuments({ createdId: { $ne: userId } });
    const campData = await camp
      .find({ createdId: { $ne: userId } })
      .skip(skip)
      .limit(size);

    res.status(200).json({
      status: 'Success',
      language: 'en-US',
      data: campData,
      totalItems: totalCamps,
      currentPage: page,
      totalPages: Math.ceil(totalCamps / size),
      message: 'Get all camps successfully!',
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      status: 'Error',
      language: 'en-US',
      error: err.message,
    });
  }
}




async function addMember(req, res, next) {
    try {
      console.log('Request Body:', req.body);
  
      const { 
        userData: { firstName, lastName, bloodGroup, streetAddress, city, district, contact, quantity },
        id: campId 
      } = req.body;
  
      if (!firstName || !lastName || !bloodGroup || !streetAddress || !city || !district || !contact || !quantity || !campId) {
        return res.status(400).json({
          status: 'Error',
          language: 'en-US',
          message: 'All fields are required.',
        });
      }
  
      const newAttendee = new attendees({
        firstname: firstName,
        lastname: lastName,
        bloodGroup,
        quantity,
        address: {
          streetAddress,
          city,
          district,
        },
        contact,
        campId,
      });
  
      console.log('New Attendee Data:', newAttendee);
  
      const savedAttendee = await newAttendee.save();
  
      return res.status(201).json({
        status: 'Success',
        language: 'en-US',
        data: savedAttendee,
        message: 'Member added successfully',
      });
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({
        status: 'Error',
        language: 'en-US',
        error: err.message,
        message: 'Error adding member',
      });
    }
  }
  
  async function getAttendeesById(req, res, next) {
    try {
      const id = req.query.id;  
      if (!id) {
        return res.status(400).json({
          status: 'Error',
          language: 'en-US',
          message: 'Id is required.',
        });
      }
  
      const members = await attendees.find({ campId: id }).populate({ path: 'campId', model: 'camp' }).exec();
  
      return res.status(200).json({
        status: 'Success',
        language: 'en-US',
        data: members,
        message: 'Members retrieved successfully by campId',
      });
  
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({
        status: 'Error',
        language: 'en-US',
        error: err.message,
        message: 'Error in getting members',
      });
    }
  }


  async function filterByAddress(req, res, next) {
    try {
      const keyword = req.query.city; 
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6; 
      const skip = (page - 1) * limit;
  
      console.log('Search keyword:', keyword);
  
      if (!keyword) {
        return res.status(400).json({
          status: 'Error',
          language: 'en-US',
          message: 'Did not get keyword for search',
        });
      }
  
      const query = {
        $or: [
          { 'address.streetAddress': { $regex: keyword, $options: 'i' } },
          { 'address.city': { $regex: keyword, $options: 'i' } },
          { 'address.district': { $regex: keyword, $options: 'i' } },
          { 'address.block': { $regex: keyword, $options: 'i' } },
          { 'address.state': { $regex: keyword, $options: 'i' } },
        ],
      };
  
      const totalItems = await camp.countDocuments(query); 
      const filteredData = await camp.find(query)
        .skip(skip)
        .limit(limit);
  
      return res.status(200).json({
        status: 'Success',
        language: 'en-US',
        data: filteredData,
        pagination: {
          totalItems,
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          itemsPerPage: limit,
        },
        message: 'Search successfully by address with pagination',
      });
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({
        status: 'Error',
        language: 'en-US',
        error: err.message,
        message: 'Error in searching address',
      });
    }
  }
  
  

module.exports = { addOrganisation, loginOrgnisation, getLoginUser, createCamp, getCampById, getAllCamps, addMember, getAttendeesById, filterByAddress };


