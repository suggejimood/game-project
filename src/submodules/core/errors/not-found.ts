import { HttpStatusCode } from "../www/statusCode";
import { CustomError } from "./error-class/custom-error";

class NotFoundError extends CustomError {
    statusCode = HttpStatusCode.NOT_FOUND;

    constructor(){
        super('Dizin bulunamadı');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export { NotFoundError };