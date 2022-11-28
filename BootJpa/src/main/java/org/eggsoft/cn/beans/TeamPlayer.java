package org.eggsoft.cn.beans;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "player_teamplayer")
public class TeamPlayer  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String nickname;

    @Column(columnDefinition = "Integer default 1")
    private Integer active;

    @Column(length = 200)
    private String activepercent;


    @Column(length = 200)
    private String playernumber;

    @Column(length = 200)
    private String playerrole;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date CreateTime=new Date();
    private Date UpdateTime;

    @Column(columnDefinition = "Integer default 0")
    private Integer deleted;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "teamplayerid")
    private List<TeamPlayerConfig> TeamPlayerConfig;

}