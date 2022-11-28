package org.eggsoft.cn.beans;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QTeamPlayerConfig is a Querydsl query type for TeamPlayerConfig
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeamPlayerConfig extends EntityPathBase<TeamPlayerConfig> {

    private static final long serialVersionUID = -1759653563L;

    public static final QTeamPlayerConfig teamPlayerConfig = new QTeamPlayerConfig("teamPlayerConfig");

    public final StringPath configname = createString("configname");

    public final StringPath configtype = createString("configtype");

    public final DateTimePath<java.util.Date> CreateTime = createDateTime("CreateTime", java.util.Date.class);

    public final NumberPath<Integer> deleted = createNumber("deleted", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> inactive = createNumber("inactive", Integer.class);

    public final NumberPath<Long> teamplayerid = createNumber("teamplayerid", Long.class);

    public final DateTimePath<java.util.Date> UpdateTime = createDateTime("UpdateTime", java.util.Date.class);

    public final NumberPath<Double> value = createNumber("value", Double.class);

    public QTeamPlayerConfig(String variable) {
        super(TeamPlayerConfig.class, forVariable(variable));
    }

    public QTeamPlayerConfig(Path<? extends TeamPlayerConfig> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTeamPlayerConfig(PathMetadata metadata) {
        super(TeamPlayerConfig.class, metadata);
    }

}

