import { HttpStatusCode } from "../www/statusCode";
import { CustomError} from "./error-class/custom-error";

class EmailVerifiedError extends CustomError {
    statusCode = HttpStatusCode.UNAUTHORIZED;

    constructor(){
        super('E posta adresi doğrulanmadı. Lütfen e posta adresinizi doğrulayın');

        Object.setPrototypeOf(this, EmailVerifiedError.prototype);
    }

    serializeErrors() {
        return [{ message:  this.message}];
    }
}

export { EmailVerifiedError };