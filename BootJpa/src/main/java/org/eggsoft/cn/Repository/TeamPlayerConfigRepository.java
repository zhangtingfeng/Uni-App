package org.eggsoft.cn.Repository;



import org.eggsoft.cn.beans.TeamPlayerConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamPlayerConfigRepository extends JpaRepository<TeamPlayerConfig, Long> {



    public List findListByTeamplayerid(Long teamplayerid);


}
