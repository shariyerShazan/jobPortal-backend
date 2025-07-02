import mongoose, { mongo } from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connet successfully')
    } catch (error) {
        console.log(error)
    }
}
export default connectDb;