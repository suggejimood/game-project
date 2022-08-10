import { CustomError } from "./error-class/custom-error";
import { ValidationError } from "express-validator";
import { HttpStatusCode } from "../www/statusCode";

class RequsetValidationError extends CustomError{
    statusCode = HttpStatusCode.BAD_REQUEST;

    constructor(public errors: ValidationError[]){
        super('Doğru tipte veri girilmedi');

        Object.setPrototypeOf(this, RequsetValidationError.prototype);
    }

    serializeErrors(){
        return this.errors.map(err => { 
            return { message: err.msg, field: err.param };
        });
    }
}

export { RequsetValidationError };