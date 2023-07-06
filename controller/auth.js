import User from "../model/user.js";

// REGISTER USER 
export const register = async(req,res) => {
    try{
        const {
            userName,
            email,
            password
        } = req.body;


        const newUser = new User({
            userName,
            email,
            password
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    }catch(err){
        res.status(500).json({error: err.message});
    }
};

// LOGGING IN

export const login = async(req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({ msg: "User Does not exist. "});

        // const isMatch = await bcrypt.compare(password,user.password);
        const isMatch = (password == user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

        res.status(200).json({user});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}; 