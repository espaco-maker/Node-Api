import { serverHttp } from "./app";

const Port = process.env.PORT || 8000;

serverHttp.listen(Port, () => {
	console.log(`server started at ${Port}`);
});
