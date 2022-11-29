package com.trafigura.situ.exception;

import com.trafigura.onedesk.utils.ErrorMessage;
import com.trafigura.situ.utils.SituResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.DataBinder;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import java.util.List;

@ControllerAdvice
public class SituExceptionController {

    private final static Logger logger = LoggerFactory.getLogger(SituExceptionController.class);


    @InitBinder
    private void activateDirectFieldAccess(DataBinder dataBinder) {
        dataBinder.initDirectFieldAccess();
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<SituResponse<ErrorMessage>> handleBadRequestException(BadRequestException ex) {
        logger.error("BadRequestException {}",ex);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        if (null != ex.getResponse()) {
            ErrorMessage error = new ErrorMessage().errorMessage(ex.getMessage());
            SituResponse.getErrors().add(error);
            logger.error(ex.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.APPLICATION_JSON)
                .body(SituResponse);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<SituResponse<ErrorMessage>> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        logger.error("MethodArgumentTypeMismatchException {}",ex);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage().errorMessage(ex.getMessage());
        SituResponse.getErrors().add(error);
        logger.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).contentType(MediaType.APPLICATION_JSON)
                .body(SituResponse);
    }


    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<SituResponse<ErrorMessage>> handleRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        logger.error("HttpRequestMethodNotSupportedException {}",ex);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage().errorMessage(ex.getMessage());

        SituResponse.getErrors().add(error);
        logger.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).contentType(MediaType.APPLICATION_JSON)
                .body(SituResponse);
    }


    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<SituResponse<ErrorMessage>> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        logger.error("NoHandlerFoundException {}",ex);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage().errorMessage(ex.getMessage());

        SituResponse.getErrors().add(error);
        logger.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).contentType(MediaType.APPLICATION_JSON)
                .body(SituResponse);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<SituResponse<ErrorMessage>> handleMethodArgumentNotValidException(HttpServletRequest req, MethodArgumentNotValidException ex) {
        logger.error("MethodArgumentNotValidException {}",ex);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        List<ObjectError> allErrors = ex.getBindingResult().getAllErrors();
        for(ObjectError objectError:allErrors) {
            Object[] arguments = objectError.getArguments();
            DefaultMessageSourceResolvable d=(DefaultMessageSourceResolvable) arguments[0];
            ErrorMessage error = new ErrorMessage().errorMessage(objectError.getDefaultMessage()).errorCode(d.getDefaultMessage());
            SituResponse.getErrors().add(error);
        }
        logger.error(ex.getBindingResult().getAllErrors().toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.APPLICATION_JSON)
                .body(SituResponse);
    }


    @ExceptionHandler(value = { IllegalArgumentException.class, IllegalStateException.class })
    protected ResponseEntity<SituResponse<ErrorMessage>> handleException(RuntimeException ex) {
        logger.error("IllegalArgumentException/IllegalStateException {}",ex);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage().errorMessage(ex.getMessage());

        SituResponse.getErrors().add(error);
        logger.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).contentType(MediaType.APPLICATION_JSON)
                .body(SituResponse);
    }


    @ExceptionHandler(value = { NullPointerException.class })
    protected ResponseEntity<SituResponse<ErrorMessage>> handleNullPointerException(NullPointerException ex) {
        logger.error("NullPointerException {}",ex);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage().errorMessage(ex.getMessage());

        SituResponse.getErrors().add(error);
        logger.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).contentType(MediaType.APPLICATION_JSON)
                .body(SituResponse);
    }

    @ExceptionHandler(SituException.class)
    public ResponseEntity<SituResponse<ErrorMessage>> exceptionHandler(SituException ex) {
        logger.error("SituException {}",ex);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage().errorMessage(ex.getMessage());

        SituResponse.getErrors().add(error);
        logger.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).contentType(MediaType.APPLICATION_JSON)
                .body(SituResponse);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<SituResponse<ErrorMessage>> exceptionHandler(ResourceNotFoundException ex) {
        logger.error("ResourceNotFoundException {}",ex);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage().errorMessage(ex.getMessage());

        SituResponse.getErrors().add(error);
        logger.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).contentType(MediaType.APPLICATION_JSON)
                .body(SituResponse);
    }


    @ExceptionHandler({ HttpMessageNotReadableException.class })
    protected ResponseEntity<SituResponse<ErrorMessage>> handleInvalidJson(HttpMessageNotReadableException e, WebRequest request) {
        logger.error("HttpMessageNotReadableException {}",e);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage();
        Throwable rootCause = e.getRootCause();
        Throwable mostSpecificCause = e.getMostSpecificCause();
        //error.setMessage(e.getMessage());
        if(null!=mostSpecificCause) {
            error.errorMessage(mostSpecificCause.getMessage());
        }
        SituResponse.getErrors().add(error);
        logger.error(e.getMessage());
        return new ResponseEntity<>(SituResponse, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler({ NotFoundException.class })
    protected ResponseEntity<SituResponse<ErrorMessage>> handleNotFoundException(NotFoundException e, WebRequest request) {
        logger.error("NotFoundException {}",e);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage();
        error.errorMessage(e.getMessage());
        SituResponse.getErrors().add(error);
        logger.error(e.getMessage());
        return new ResponseEntity<>(SituResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({ NumberFormatException.class })
    protected ResponseEntity<SituResponse<ErrorMessage>> handleNumberFormatException(NumberFormatException e, WebRequest request) {
        logger.error("NumberFormatException {}",e);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage();
        error.errorMessage("Invalid request parameter.");
        SituResponse.getErrors().add(error);
        logger.error(e.getMessage());
        return new ResponseEntity<>(SituResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public final ResponseEntity<SituResponse<ErrorMessage>> handleMissingServletRequestException(
            MissingServletRequestParameterException ex, WebRequest request) {
        logger.error("MissingServletRequestParameterException {}",ex);
        SituResponse<ErrorMessage> SituResponse=new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage();
        error.errorMessage(ex.getMessage());
        SituResponse.getErrors().add(error);
        logger.error(ex.getMessage());
        return new ResponseEntity<>(SituResponse, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(Exception.class)
    public final ResponseEntity<SituResponse<ErrorMessage>> handleAllExceptions(Exception ex,
                                                                                   WebRequest request) {
        logger.error("Exception {}",ex);
        SituResponse<ErrorMessage> SituResponse = new SituResponse<ErrorMessage>();
        ErrorMessage error = new ErrorMessage();
        error.errorMessage(ex.getMessage());
        SituResponse.getErrors().add(error);
        logger.error(ex.getMessage());
        return new ResponseEntity<>(SituResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}

