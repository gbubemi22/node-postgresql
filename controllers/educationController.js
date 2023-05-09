import User from '../models/User.js';
import Education from '../models/Education.js';
import CustomError from '../errors/conflict.js';
import { StatusCodes } from 'http-status-codes';



const educationController = {

     createEduInfo: async (req, res) => {

          const { 
               primary_education_name,
               primary_education_city,
               primary_education_state,
               primary_education_country,
               primary_education_year_joined,
               primary_education_year_end,
               secondary_education_school_name,
               secondary_education_city,
               secondary_education_state,
               secondary_education_country,
               secondary_education_year_joined,
               secondary_education_year_end,
               tertiary_education_school_name,
               tertiary_education_qualification,
               tertiary_education_city,
               tertiary_education_state,
               tertiary_education_country,
               tertiary_education_year_joined,
               tertiary_education_year_end,
               other_education_degree,
               userId
          } = req.body;
          const user = await User.findByPk(userId)

          if (!user) {
               throw new CustomError.NotFoundError('User not found');
          }

          const education = await Education.create({
               primary_education_name,
               primary_education_city,
               primary_education_state,
               primary_education_country,
               primary_education_year_joined,
               primary_education_year_end,
               secondary_education_school_name,
               secondary_education_city,
               secondary_education_state,
               secondary_education_country,
               secondary_education_year_joined,
               secondary_education_year_end,
               tertiary_education_school_name,
               tertiary_education_qualification,
               tertiary_education_city,
               tertiary_education_state,
               tertiary_education_country,
               tertiary_education_year_joined,
               tertiary_education_year_end,
               other_education_degree,
               userId
          })

          res.status(StatusCodes.CREATED).json({
               message: " Education info created",
               education
          })

     },

     getEduInfo: async (req, res) => {
          const { userId } = req.params;

          const education = await Education.findOne({ where: { userId } });

          if (!education) {
               throw new CustomError.NotFoundError('Education information not found for user');
          }

          res.status(StatusCodes.OK).json({
               message: 'Education information retrieved successfully',
               education,
          });

     },


     deleteEduInfo: async (req, res) => {
          const { userId } = req.params;

          const education = await Education.findOne({ where: { userId } });

          if (!education) {
               throw new CustomError.NotFoundError('Education information not found for user');
          }

          await education.destroy();

          res.status(StatusCodes.OK).json({
               message: 'Education information deleted successfully',
          });
     },


     updateEduInfo: async (req, res) => {
          const { userId } = req.params;
          const {
            primary_education_name,
            primary_education_city,
            primary_education_state,
            primary_education_country,
            primary_education_year_joined,
            primary_education_year_end,
            secondary_education_school_name,
            secondary_education_city,
            secondary_education_state,
            secondary_education_country,
            secondary_education_year_joined,
            secondary_education_year_end,
            tertiary_education_school_name,
            tertiary_education_qualification,
            tertiary_education_city,
            tertiary_education_state,
            tertiary_education_country,
            tertiary_education_year_joined,
            tertiary_education_year_end,
            other_education_degree,
          } = req.body;
        
          const education = await Education.findOne({ where: { userId } });
        
          if (!education) {
            throw new CustomError.NotFoundError('Education information not found for user');
          }
        
          const updatedFields = {
            primary_education_name,
            primary_education_city,
            primary_education_state,
            primary_education_country,
            primary_education_year_joined,
            primary_education_year_end,
            secondary_education_school_name,
            secondary_education_city,
            secondary_education_state,
            secondary_education_country,
            secondary_education_year_joined,
            secondary_education_year_end,
            tertiary_education_school_name,
            tertiary_education_qualification,
            tertiary_education_city,
            tertiary_education_state,
            tertiary_education_country,
            tertiary_education_year_joined,
            tertiary_education_year_end,
            other_education_degree,
          };
        
          Object.keys(updatedFields).forEach(key => {
            if (!updatedFields[key]) {
              delete updatedFields[key];
            }
          });
        
          await education.update(updatedFields);
        
          res.status(StatusCodes.OK).json({
            message: 'Education information updated successfully',
            education,
          });
        }





}



export default educationController;