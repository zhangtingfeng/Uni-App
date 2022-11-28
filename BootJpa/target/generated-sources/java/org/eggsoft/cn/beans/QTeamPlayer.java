package org.eggsoft.cn.beans;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamPlayer is a Querydsl query type for TeamPlayer
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeamPlayer extends EntityPathBase<TeamPlayer> {

    private static final long serialVersionUID = -971683805L;

    public static final QTeamPlayer teamPlayer = new QTeamPlayer("teamPlayer");

    public final NumberPath<Integer> active = createNumber("active", Integer.class);

    public final StringPath activepercent = createString("activepercent");

    public final DateTimePath<java.util.Date> CreateTime = createDateTime("CreateTime", java.util.Date.class);

    public final NumberPath<Integer> deleted = createNumber("deleted", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath nickname = createString("nickname");

    public final StringPath playernumber = createString("playernumber");

    public final StringPath playerrole = createString("playerrole");

    public final ListPath<TeamPlayerConfig, QTeamPlayerConfig> TeamPlayerConfig = this.<TeamPlayerConfig, QTeamPlayerConfig>createList("TeamPlayerConfig", TeamPlayerConfig.class, QTeamPlayerConfig.class, PathInits.DIRECT2);

    public final DateTimePath<java.util.Date> UpdateTime = createDateTime("UpdateTime", java.util.Date.class);

    public QTeamPlayer(String variable) {
        super(TeamPlayer.class, forVariable(variable));
    }

    public QTeamPlayer(Path<? extends TeamPlayer> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTeamPlayer(PathMetadata metadata) {
        super(TeamPlayer.class, metadata);
    }

}

