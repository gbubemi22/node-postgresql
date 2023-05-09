import User from '../models/User.js';
import CustomError from '../errors/conflict.js';
import { StatusCodes } from 'http-status-codes';




const elitesController = {


     getAllPolitician: async (req, res) => {

          const user = await User.findAll({ where: { account_type: 'POLITICIAN' } });

          res.status(StatusCodes.OK).json({ user });

     },

     getAllElites: async (req, res) => {

          const user = await User.findAll({ where: { account_type: 'ELITE' } });

          res.status(StatusCodes.OK).json({ user });

     },



     getOneElite: async (req, res) => {
          const { id } = req.params;

          const user = await User.findByPk(id);
          if (!user) {
               throw new CustomError.NotFoundError('User not found');
          }
          res.status(StatusCodes.OK).json(user);
     },


     deleteElite: async (req, res) => {

          const { id } = req.params;

          const user = await User.findByPk(id);
          if (!user) {
               throw new CustomError.NotFoundError('Elite not found');
          }
          await elite.destroy();
          res.status(StatusCodes.OK).json({ message: 'User deleted successfully' });
     },



     updateElite: async (req, res) => {
          const { id } = req.params;

          const {
               first_name,
               last_name,
               email_address,
               contact_number,
               password,
               state_origin,
               lga_origin, place_of_birth,
               gender,
               short_bio,
               occupation
          } = req.body;

          const user = await User.findByPk(id);
          if (!user) {
               throw new CustomError.NotFoundError('Elite not found');
          }

          await user.update({
               first_name: first_name || user.first_name,
               last_name: last_name || user.last_name,
               email_address: email_address || user.email_address,
               contact_number: contact_number || user.contact_number,
               password: password || user.password,
               state_origin: state_origin || user.state_origin,
               lga_origin: lga_origin || user.lga_origin,
               place_of_birth: place_of_birth || user.place_of_birth,
               gender: gender || user.gender,
               short_bio: short_bio || user.short_bio,
               occupation: occupation || user.occupation
          });

          res.status(StatusCodes.OK).json(user);

     },

}

export default elitesController