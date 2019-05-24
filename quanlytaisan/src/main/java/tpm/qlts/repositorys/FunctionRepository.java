package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.Function;

@Repository("functionRepository")
public interface FunctionRepository extends CrudRepository<Function, Integer> {

	@Query("select f from Function f inner join f.module m where m.moduleID = :moduleID")
	public List<Function> getFunctionByModuleID(@Param("moduleID") int moduleID);
}