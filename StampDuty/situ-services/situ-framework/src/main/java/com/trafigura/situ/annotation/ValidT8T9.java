package com.trafigura.situ.annotation;

import com.trafigura.situ.validation.T8T9Validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ TYPE, FIELD, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = T8T9Validator.class)
@Documented
public @interface ValidT8T9 {
    String message() default "Invalid %1 Code";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String t5();
}

