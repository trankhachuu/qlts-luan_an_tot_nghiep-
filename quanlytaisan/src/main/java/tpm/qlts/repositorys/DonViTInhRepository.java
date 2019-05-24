package tpm.qlts.repositorys;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.DonViTinh;

@Repository("donViTInhRepository")
public interface DonViTInhRepository extends CrudRepository<DonViTinh, Integer>{

}
