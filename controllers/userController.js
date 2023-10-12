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


export const userSignup = async(request, response, args) => {
    const {username, email, password, registrationDate} = request.body;

    let userExits;
    try{
        userExits = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }

    if(userExits){
        return response.status(400).json({message: "User is alreday existing"})
    }

    const newUser = new User({
        username,
        email,
        password,
        registrationDate
    });

    try{
        await newUser.save();
    }catch(err){
        return console.log(err);
    }
    return response.status(201).json({newUser})

}


