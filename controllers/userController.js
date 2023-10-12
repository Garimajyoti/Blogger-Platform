import User from "../models/User";

export const getAllUsers = async(request, response, args)=>{
    let allUsers;
    try{
        allUsers = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!allUsers){
        return response.status(404).json({message: "User does not exits"});
    }
    return response.status(200).json({allUsers});
};

