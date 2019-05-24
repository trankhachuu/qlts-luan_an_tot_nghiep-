package tpm.qlts.repositorys;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.ChucVu;

@Repository("chucVuRepository")
public interface ChucVuRepository extends CrudRepository<ChucVu, Integer>{
	
}
