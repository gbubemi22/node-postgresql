import User from '../models/User.js';
import Party from '../models/PartyInfo.js';
import CustomError from '../errors/conflict.js';
import { StatusCodes } from 'http-status-codes';


const partyController =  {

     createParty: async (req, res) => {
          const {
               current_party_name,
               current_party_position,
               current_party_position_status,
               current_date_year_joined,
               userId,
          } = req.body;

          const user = await User.findByPk(userId)


          if (!user) {
               throw new CustomError.NotFoundError('User not found');
          }

         const party = await Party.create({
          current_party_name,
          current_party_position,
          current_party_position_status,
          current_date_year_joined,
          userId,
         }) 



         res.status(StatusCodes.CREATED).json({
          message: " Party info created",
          party
     })
     },

     getOnePartByUserId: async (req, res) => {
          const { userId } = req.params;
          
          const party = await Party.findOne({ where: { userId: userId}})

          if(!party) {
               throw new CustomError.NotFoundError('Party information not found for user');   
          }

          res.status(StatusCodes.OK).json({
               message: "Party information retrived successfully",
               party
          })
     },

     deleteEduInfo: async (req, res) => {
          const { userId } = req.params;

          const party = await Party.findOne({ where: { userId } });

          if (!party) {
               throw new CustomError.NotFoundError('Education information not found for user');
          }

          await party.destroy();

          res.status(StatusCodes.OK).json({
               message: 'PatyInfo information deleted successfully',
          });
     },

     updateEduInfo: async (req, res) => {
          const { userId } = req.params;
          const {
               current_party_name,
               current_party_position,
               current_party_position_status,
               current_date_year_joined,
          } = req.body;
        
          const party = await Party.findOne({ where: { userId } });
        
          if (!party) {
            throw new CustomError.NotFoundError('Education information not found for user');
          }
        
          const updatedFields = {
               current_party_name,
               current_party_position,
               current_party_position_status,
               current_date_year_joined,
          };
        
          Object.keys(updatedFields).forEach(key => {
            if (!updatedFields[key]) {
              delete updatedFields[key];
            }
          });
        
          await party.update(updatedFields);
        
          res.status(StatusCodes.OK).json({
            message: 'Party information updated successfully',
            party,
          });
        }


}



export default partyController