package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.Group;
import tpm.qlts.entitys.UserRefGroup;
import tpm.qlts.entitys.UserRefGroupPK;

@Repository("userRefGroupRepository")
public interface UserRefGroupRepository extends CrudRepository<UserRefGroup, UserRefGroupPK> {

	@Query("select c.groupID from UserRefGroup c where c.userID = :userID")
	public List<Integer> getAllGroupByUserID(@Param("userID") String userID);
	
	@Query("select c.group from UserRefGroup c where c.userID = :userID")
	public List<Group> getGroupEntityByUserID(@Param("userID") String userID);
}
