import { HttpStatusCode } from "../www/statusCode";
import { CustomError} from "./error-class/custom-error";

class UnauthorizedError extends CustomError {
    statusCode = HttpStatusCode.UNAUTHORIZED;

    constructor(){
        super('Giriş yapılmadı');

        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export { UnauthorizedError };