package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.Function;
import tpm.qlts.entitys.GroupRefFunction;
import tpm.qlts.entitys.GroupRefFunctionPK;

@Repository("groupRefFunctionRepository")
public interface GroupRefFunctionRepository extends CrudRepository<GroupRefFunction, GroupRefFunctionPK>{
	@Query("select c from Function c inner join c.groupFunctions g where g.groupID = :groupID")
	public List<Function> getFunctionByGroupKey(@Param("groupID") int groupID);
	
	@Query("select c.functionID from GroupRefFunction c where c.groupID = :groupID")
	public List<Integer> getFunctionByGroupID(@Param("groupID") int groupID);
	
	@Query("select distinct c.functionID from GroupRefFunction c where c.groupID in :groupIDs")
	public List<Integer> getFunctionByLstGroupID(@Param("groupIDs") List<Integer> groupIDs);
}
