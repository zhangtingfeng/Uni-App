package org.eggsoft.cn.beans;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QIprecord is a Querydsl query type for Iprecord
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QIprecord extends EntityPathBase<Iprecord> {

    private static final long serialVersionUID = 1238078973L;

    public static final QIprecord iprecord = new QIprecord("iprecord");

    public final NumberPath<Integer> deleted = createNumber("deleted", Integer.class);

    public final DateTimePath<java.util.Date> dt = createDateTime("dt", java.util.Date.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath ipaddress = createString("ipaddress");

    public final StringPath salesagent = createString("salesagent");

    public final StringPath type = createString("type");

    public QIprecord(String variable) {
        super(Iprecord.class, forVariable(variable));
    }

    public QIprecord(Path<? extends Iprecord> path) {
        super(path.getType(), path.getMetadata());
    }

    public QIprecord(PathMetadata metadata) {
        super(Iprecord.class, metadata);
    }

}

