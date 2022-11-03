package org.eggsoft.cn.beans;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
@Data
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "player_users")
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;


    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date dt=new Date();
    private boolean isdeleted=false;

}