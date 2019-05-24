package tpm.qlts.repositorys;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.Group;

@Repository("groupRepository")
public interface GroupRepository extends CrudRepository<Group, Integer>{
	
}
