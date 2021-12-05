package hahn.applicationprocess.application.exception;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public final ResponseEntity<UserErrorResponse> handleUserNotFoundException
                        (UserNotFoundException ex) 
    {
        UserErrorResponse error = new UserErrorResponse();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(ConstraintViolationException.class)
    public final ResponseEntity<UserErrorResponse> handleDuplicateFoundException
                        (ConstraintViolationException ex) 
    {
        UserErrorResponse error = new UserErrorResponse();
        error.setStatus(HttpStatus.CONFLICT.value());
        if(ex.getCause().getLocalizedMessage().contains("asset.UC_asset")) {
        	error.setMessage("Asset already exists in the tracked list!");
        }else {      	
        	error.setMessage("Mail id already exists!");
        }
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }
    @ExceptionHandler(AssetApiException.class)
    public final ResponseEntity<UserErrorResponse> assetApiException
                        (AssetApiException ex) 
    {
        UserErrorResponse error = new UserErrorResponse();
        error.setStatus(HttpStatus.BAD_REQUEST.value());    	
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(InvalidUserException.class)
    public final ResponseEntity<UserErrorResponse> invalidUserException
                        (InvalidUserException ex) 
    {
        UserErrorResponse error = new UserErrorResponse();
        error.setStatus(HttpStatus.BAD_REQUEST.value());    	
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
