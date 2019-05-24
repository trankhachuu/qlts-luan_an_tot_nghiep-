package tpm.qlts.repositorys;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.Module;

@Repository("moduleRepository")
public interface ModuleRepository extends CrudRepository<Module, Integer>{

}
