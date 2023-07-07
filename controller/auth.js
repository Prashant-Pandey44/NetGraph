import User from "../model/user.js";
import neo4j from 'neo4j-driver';
import dotenv from "dotenv";

dotenv .config();


var driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic("neo4j", process.env.NEO4J_PASS));
var session = driver.session();

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

        // Code for adding node in Neo4j databse.

        session
        .run( `CREATE (a:User {name: '${userName}'})` )    // CREATE p = (:User {name:'user1'})-[:KNOWS]->(:User {name: 'user2'})  RETURN p // for creating relationships.
        .then( function()
        {
          driver.close();
      
        })  // Neo4j part end here.

        

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