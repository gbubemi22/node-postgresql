import User from '../models/User.js';
import Business from '../models/BusinessInfo.js';
import CustomError from '../errors/conflict.js';
import { StatusCodes } from 'http-status-codes';




const businessController = {

     createbusiness: async (req, res) => {
          const {
               business_name,
               location,
               industry,
               no_of_employee,
               userId
          } = req.body;

          const user = await User.findByPk(userId)
          createbusiness

          if (!user) {
               throw new CustomError.NotFoundError('User not found');
          }


          const business = await Business.create({
               business_name,
               location,
               industry,
               no_of_employee,
               userId   
          })

          res.status(StatusCodes.CREATED).json({
               message: " Business info created",
               business
          })

     },

     getOneBusinessByUserId: async (req, res) => {
          const { userId } = req.params;
          
          const business = await Business.findOne({ where: { userId: userId}})

          if(!business) {
               throw new CustomError.NotFoundError('Business information not found for user');   
          }

          res.status(StatusCodes.OK).json({
               message: "Party information retrived successfully",
               business
          })  
     },

     deleteBussnessInfo: async (req, res) => {
          const { userId } = req.params;

          const business = await Business.findOne({ where: { userId } });

          if (!business) {
               throw new CustomError.NotFoundError('Education information not found for user');
          }

          await business.destroy();

          res.status(StatusCodes.OK).json({
               message: 'Business information deleted successfully',
          });
     },


     updateEduInfo: async (req, res) => {
          const { userId } = req.params;
          const {
               business_name,
               location,
               industry,
               no_of_employee,
          } = req.body;
        
          const business = await Business.findOne({ where: { userId } });
        
          if (!business) {
            throw new CustomError.NotFoundError('Business information not found for user');
          }
        
          const updatedFields = {
               business_name,
               location,
               industry,
               no_of_employee,
          };
        
          Object.keys(updatedFields).forEach(key => {
            if (!updatedFields[key]) {
              delete updatedFields[key];
            }
          });
        
          await party.update(updatedFields);
        
          res.status(StatusCodes.OK).json({
            message: 'Business information updated successfully',
            business,
          });
        }
}


export default businessController