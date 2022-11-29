package com.trafigura.situ.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.trafigura.situ.annotation.ValidLength;

public class LengthValidator implements ConstraintValidator<ValidLength, String> {
    @Override
    public void initialize(ValidLength constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value.length()>4000){
            return false;
        }
        return true;
    }
}
