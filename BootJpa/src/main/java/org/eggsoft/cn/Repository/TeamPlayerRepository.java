package org.eggsoft.cn.Repository;


import org.eggsoft.cn.beans.TeamPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamPlayerRepository extends JpaRepository<TeamPlayer, Long> {



    public List findByNicknameLike(String name);
}
