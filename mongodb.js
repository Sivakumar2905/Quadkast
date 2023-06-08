import {MongoClient} from 'mongodb'

export const connectDB = async () => {

    const url ="mongodb://0.0.0.0:27017/local"; 
    
    const mongoClient = new MongoClient(url); 
    const client= await mongoClient.connect()
    
    const mongoDB = await client.db();
    return mongoDB;
    
}