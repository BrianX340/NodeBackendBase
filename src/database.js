import mongoose from "mongoose";
var URI;
URI = process.env.LOCAL_MONGO == 'true' ? process.env.MONGO_URI_LOCAL : process.env.MONGO_URI_CLOUD;
URI = URI.replace('DB_NAME', process.env.DB_NAME)
mongoose
	.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.then((db) => {
			console.log(`Connected to DB: ${process.env.DB_NAME}`)
		})
			.catch((err) => console.log(err));