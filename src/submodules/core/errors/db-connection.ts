import { HttpStatusCode } from "../www/statusCode";
import { CustomError } from "./error-class/custom-error";

class DbConnectionError extends CustomError {
    statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

    constructor(){
        super('Database bağlantısı yapılmadı');

        Object.setPrototypeOf(this, DbConnectionError.prototype);
    }

    serializeErrors(){
        return [
            {message: this.message}
        ]
    }
}

export { DbConnectionError };