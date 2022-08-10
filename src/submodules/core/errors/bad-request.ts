import { HttpStatusCode } from "../www/statusCode";
import { CustomError } from "./error-class/custom-error";

class BadRequestError extends CustomError {
    statusCode = HttpStatusCode.BAD_REQUEST;

    constructor(public message: string){
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(){
        return [{ message: this.message }];
    }
};

export { BadRequestError };