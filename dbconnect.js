import mongoose from 'mongoose';

let isConnected = false; // track the connection

const dbcon = async ()=>{
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.CONNECT_MONGODB_URI, {
      dbName: "iventry",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}
export default dbcon;