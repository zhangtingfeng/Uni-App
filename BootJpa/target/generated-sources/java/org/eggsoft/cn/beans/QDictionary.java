package org.eggsoft.cn.beans;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QDictionary is a Querydsl query type for Dictionary
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QDictionary extends EntityPathBase<Dictionary> {

    private static final long serialVersionUID = 1064757531L;

    public static final QDictionary dictionary = new QDictionary("dictionary");

    public final DateTimePath<java.util.Date> CreateTime = createDateTime("CreateTime", java.util.Date.class);

    public final NumberPath<Integer> deleted = createNumber("deleted", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> inactive = createNumber("inactive", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath type = createString("type");

    public final DateTimePath<java.util.Date> UpdateTime = createDateTime("UpdateTime", java.util.Date.class);

    public final StringPath value = createString("value");

    public QDictionary(String variable) {
        super(Dictionary.class, forVariable(variable));
    }

    public QDictionary(Path<? extends Dictionary> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDictionary(PathMetadata metadata) {
        super(Dictionary.class, metadata);
    }

}

