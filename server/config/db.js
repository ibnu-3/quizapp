import mongoose from "mongoose"

const connectDB =async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log(`<<<<< MongoDB Connectted >>>>> `.bold.cyan)
    } catch (error) {
        console.log('MongoDB error:'.red.bold, error)
        process.exit(1)
    }
}
export default connectDB