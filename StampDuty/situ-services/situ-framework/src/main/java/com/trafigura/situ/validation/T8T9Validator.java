package com.trafigura.situ.validation;

import com.trafigura.situ.annotation.ValidT8T9;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class T8T9Validator implements ConstraintValidator<ValidT8T9, String> {

    private Pattern pattern;
    private Matcher matcher;
    private static final String T8T9_PATTERN = "\\d+\\.\\d+|\\d+[SP]\\.\\d+|.+\\.TFS\\d+";

    private String t5;

    @Override
    public void initialize(final ValidT8T9 constraintAnnotation) {

    }

    @Override
    public boolean isValid(String t8t9, ConstraintValidatorContext constraintValidatorContext) {
        return (validateT8T9(t8t9));

    }
    private boolean validateT8T9(final String t8t9) {
        pattern = Pattern.compile(T8T9_PATTERN);
        matcher = pattern.matcher(t8t9);
        return matcher.matches();
    }

}
