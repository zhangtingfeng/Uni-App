package org.eggsoft.cn.Repository;


import org.eggsoft.cn.beans.TeamPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamPlayerRepository extends JpaRepository<TeamPlayer, Long> {



    public List<TeamPlayer> findByNicknameLike(String name);

    @Query(value = "select ID from player_teamplayer where nickname=? ", nativeQuery = true)
    public List<TeamPlayer> findByNicknameLikeNotDelete(String nickname);
    //@Query(value = "select * from player_teamplayer where nickname=? ", nativeQuery = true)

}
