import { HttpStatusCode } from "../www/statusCode";
import { CustomError } from "./error-class/custom-error";

class AlreadyExistError extends CustomError {
    statusCode = HttpStatusCode.CONFLICT;

    constructor(public message: string){
        super(message);

        Object.setPrototypeOf(this, AlreadyExistError.prototype);
    }

    serializeErrors(){
        return [{ message: this.message }];
    }
};

export { AlreadyExistError };