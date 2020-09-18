import mongoose from "mongoose";

export default (host: string, port: string, name: string) => {
  const connect = () => {
    mongoose
      .connect(`mongodb://${host}:${port}/${name}`, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      })
      .then(() => {
        return console.info(`CONNECTING TO MONGODB AT: ${host}`);
      })
      .catch((error) => {
        console.error("ERROR CONNECTING TO MONGODB: ", error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on("disconnected", connect);
};
