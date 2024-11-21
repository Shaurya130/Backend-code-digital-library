const { constants }= require("../constants");
const errorHandler =(err, req, res, next) =>{  //next to fuurther process the program
    const statusCode= res.statusCode?res.statusCode:3000; 

    //a stack trace is a list of the method calls that the application was in the middle of when an Exception was thrown i.e in which file problem has occured

    switch(statusCode)
    {
        case constants.NOT_FOUND:
        res.json({
            title:"NOT FOUND",
             message: err.message,
            stackTrace:err.stackTrace,
        });
         break;

         case constants.VALIDATION_ERROR:
        res.json({
            title:"VALIDATION FAILED",
            message:err.message,
            stackTrace:err.stackTrace,
        });

        case constants.FORBIDDEN:
        res.json({
            title:"FORBIDDEN",
            message:err.message,
            stackTrace:err.stackTrace,
        });

        case constants.UNAUTHORIZED:
        res.json({
            title:"UNAUTHORIZED",
            message:err.message,
            stackTrace:err.stackTrace,
        });

        case constants.SERVER_ERROR:
        res.json({
            title:"Server Error",
            message:err.message,
            stackTrace:err.stackTrace,
        });
};
}
module.exports=errorHandler;