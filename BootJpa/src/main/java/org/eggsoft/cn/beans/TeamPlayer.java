package org.eggsoft.cn.beans;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
<<<<<<< HEAD
import java.util.List;
=======
import java.util.HashSet;
import java.util.List;
import java.util.Set;
>>>>>>> dev

@Data
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "player_teamplayer")
public class TeamPlayer  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String nickname;

    @Column(columnDefinition = "Integer default 1")
<<<<<<< HEAD
    private Integer inactive;


=======
    private Integer active;

    @Column(length = 200)
    private String activepercent;


    @Column(length = 200)
    private String playernumber;

    @Column(length = 200)
    private String playerrole;
>>>>>>> dev

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date CreateTime=new Date();
    private Date UpdateTime;

    @Column(columnDefinition = "Integer default 0")
    private Integer deleted;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "teamplayerid")
<<<<<<< HEAD
    private List<TeamPlayerConfig> employees;
=======
    private List<TeamPlayerConfig> TeamPlayerConfig;
>>>>>>> dev

}