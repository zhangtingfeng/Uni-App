package com.trafigura.situ.security.model;

import lombok.Data;

@Data
public class AppUserDTO {

    private String userCode;

    private String loginUserName;

    private String userDisplayName;
    
    private String firstName;
    
    private String lastName;

}
