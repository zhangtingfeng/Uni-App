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
    @Column(name = "ID", nullable = false)
    private Long id;
    private String name;
//https://gitlab.global.trafigura.com/CLA/situ/-/blob/master/situ-services/situ-domain/src/main/java/com/trafigura/situ/domain/DocumentInfoEntity.java

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date dt=new Date();
    private boolean isdeleted=false;

}