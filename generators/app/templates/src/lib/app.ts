import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "../routes";

class App {
    public app: express.Application;

    public constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use("/", routes);
    }

}

export default new App().app;