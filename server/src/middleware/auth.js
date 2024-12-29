// import jwt from 'jsonwebtoken';
// import { User } from '../models/userModel.js';

// export const isauthenticated = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: 'Authentication required' });
//   }

//   try {
//     const decoded = jwt.verify(token, '!@#$%^&*()');
//     req.user = await User.findById(decoded._id);
//     if (!req.user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };


import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const isauthenticated = async (req, res, next) => {
  const token = req.cookies.token; // Check for the token in cookies
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' }); // Token not found
  }

  try {
    const decoded = jwt.verify(token, '!@#$%^&*()'); // Verify the JWT token using the secret
    req.user = await User.findById(decoded._id); // Find the user based on the decoded user id
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' }); // If user is not found
    }
    next(); // Proceed to the next middleware if user is authenticated
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' }); // Token verification failed
  }
};

