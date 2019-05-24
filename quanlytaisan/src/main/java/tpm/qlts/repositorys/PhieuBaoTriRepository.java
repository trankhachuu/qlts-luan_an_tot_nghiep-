package tpm.qlts.repositorys;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.PhieuBaoTri;

@Repository("phieuBaoTriRepository")
public interface PhieuBaoTriRepository extends CrudRepository<PhieuBaoTri, Integer>{

}
