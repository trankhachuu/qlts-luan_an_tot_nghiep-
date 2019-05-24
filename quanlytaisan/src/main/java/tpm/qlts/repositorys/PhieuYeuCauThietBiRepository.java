package tpm.qlts.repositorys;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.PhieuYeuCauThietBi;

@Repository("phieuYeuCauThietBiRepository")
public interface PhieuYeuCauThietBiRepository extends CrudRepository<PhieuYeuCauThietBi, Integer>{

}
