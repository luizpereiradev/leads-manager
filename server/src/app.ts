import { leads } from "./routes";
import server from "./server";

server.listen(8001);

server.use('/leads', leads);


