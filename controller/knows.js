import neo4j from 'neo4j-driver';
import dotenv from "dotenv";

dotenv .config();


var driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic("neo4j", process.env.NEO4J_PASS));
var session = driver.session();

export const knows = async(req,res) => {
    try{
        // console.log(req.params);
        // Code for adding node in Neo4j databse.

        session
        .run( `CREATE p = (:User {name:'${req.params.userone}'})-[:KNOWS]->(:User {name: '${req.params.usertwo}'})` )    // CREATE p = (:User {name:'user1'})-[:KNOWS]->(:User {name: 'user2'})  RETURN p // for creating relationships.
        .then( function()
        {
          driver.close();
      
        })  // Neo4j part end here.

        
        res.status(201);

    }catch(err){
        res.status(500).json({error: err.message});
    }
};