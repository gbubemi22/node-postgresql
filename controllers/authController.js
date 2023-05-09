import User from '../models/User.js';
import CustomError from '../errors/conflict.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/password.js';
import jwt from 'jsonwebtoken';

const validatePasswordString = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

  if (!password.match(regex)) {
    throw new CustomError.BadRequestError(
      'Password must contain a capital letter, number, special character & greater than 8 digits.',
    );
  }
}

const authController = {
  registerElite: async (req, res) => {
    const {
      first_name, last_name, email_address, contact_number, password, state_origin, lga_origin, place_of_birth, gender, short_bio, occupation,
      account_type
    } = req.body;

    validatePasswordString(password);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new CustomError.ConflictError('Email already registered');
    }

    const existingNumber = await User.findOne({ where: { contact_number } });
    if (existingNumber) {
      throw new CustomError.ConflictError('Number already registered');
    }

    // Hash the password and create the user
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      first_name,
      last_name,
      email_address,
      contact_number,
      password: hashedPassword,
      state_origin,
      lga_origin,
      place_of_birth,
      gender,
      short_bio,
      occupation,
      account_type
    });

    res.status(StatusCodes.CREATED).json({
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email_address: user.email_address,
        contact_number: user.contact_number,
        state_origin: user.state_origin,
        lga_origin: user.lga_origin,
        place_of_birth: user.place_of_birth,
        gender: user.gender,
        short_bio: user.short_bio,
        occupation: user.occupation,
        account_type: user.account_type
      }
    });

  },


  registerPolitician: async (req, res) => {
    const {
      first_name, last_name, email_address, contact_number, password, state_origin, lga_origin, place_of_birth, gender, short_bio, occupation,
    } = req.body;

    validatePasswordString(password);

    const existingUser = await User.findOne({ where: { email_address } });
    if (existingUser) {
      throw new CustomError.ConflictError('Email already registered');
    }

    const existingNumber = await User.findOne({ where: { contact_number } });
    if (existingNumber) {
      throw new CustomError.ConflictError('Number already registered');
    }

    // Hash the password and create the user
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      first_name,
      last_name,
      email_address,
      contact_number,
      password: hashedPassword,
      state_origin,
      lga_origin,
      place_of_birth,
      gender,
      short_bio,
      occupation,
      account_type: 'Politician', // set account_type to "Politician"
    });

    res.status(StatusCodes.CREATED).json({
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email_address: user.email_address,
        contact_number: user.contact_number,
        state_origin: user.state_origin,
        lga_origin: user.lga_origin,
        place_of_birth: user.place_of_birth,
        gender: user.gender,
        short_bio: user.short_bio,
        occupation: user.occupation,
        account_type: user.account_type,
      },
    });
  },


  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new CustomError.BadRequestError('Invalid email or password');
    }

    // Check the password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError.BadRequestError('Invalid email or password');
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, accountType: user.account_type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(StatusCodes.OK).json({
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email_address: user.email_address,
        contact_number: user.contact_number,
        state_origin: user.state_origin,
        lga_origin: user.lga_origin,
        place_of_birth: user.place_of_birth,
        gender: user.gender,
        short_bio: user.short_bio,
        occupation: user.occupation,
        account_type: user.account_type,

      },
      token
    });
  }
};

export default authController;