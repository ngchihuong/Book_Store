import mongoose from "mongoose";

const dbState = [
    {
        value: 0,
        label: "Disconnected"
    },
    {
        value: 1,
        label: "Connected"
    },
    {
        value: 2,
        label: "Connecting"
    },
    {
        value: 3,
        label: "Disconnecting"
    }
];
const connecttion = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value === state)?.label, "to database"); //connnect to db
}
export default connecttion;