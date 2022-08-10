import { HttpStatusCode } from "../www/statusCode";
import { CustomError} from "./error-class/custom-error";

class JWTisnotValid extends CustomError {
    statusCode = HttpStatusCode.JWT_IS_NOT_VALID;

    constructor(){
        super('Not Authorized');

        Object.setPrototypeOf(this, JWTisnotValid.prototype);
    }

    serializeErrors() {
        return [{ message:  this.message}];
    }
}

export { JWTisnotValid };