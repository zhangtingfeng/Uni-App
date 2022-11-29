package com.trafigura.situ.exception;

import com.trafigura.onedesk.exception.OneDeskException;

public class SituException extends OneDeskException {

    /**
	 * 
	 */
	private static final long serialVersionUID = -6868508782294800859L;

	/**
     * @param errorMessage
     */
    public SituException(String errorMessage) {
        super(errorMessage);
    }

    public SituException() {
        super();
    }

    public SituException(String expMessage, Object[] objectArguments) {
        super(expMessage, objectArguments);
    }

    public static SituException create(String expMessage){
        return new SituException(expMessage);
    }

    public static SituException create(String expMessage, Object... objectArguments){
    	SituException exp = new SituException(expMessage, objectArguments);
        return exp;
    }

}
