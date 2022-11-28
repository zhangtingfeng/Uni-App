package org.eggsoft.cn.Repository;


import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.eggsoft.cn.beans.TeamPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import java.awt.print.Pageable;
import java.util.List;
import java.util.function.Predicate;

@Repository
public interface TeamPlayerRepository extends JpaRepository<TeamPlayer, Long> {




    public List<TeamPlayer> findByNicknameLike(String name);

    @Query(value = "select ID from player_teamplayer where nickname=? ", nativeQuery = true)
    public List<TeamPlayer> findByNicknameLikeNotDelete(String nickname);
    //@Query(value = "select * from player_teamplayer where nickname=? ", nativeQuery = true)



}
