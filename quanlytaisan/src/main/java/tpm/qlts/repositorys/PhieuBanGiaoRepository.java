package tpm.qlts.repositorys;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.PhieuBanGiao;

@Repository("phieuBanGiaoRepository")
public interface PhieuBanGiaoRepository extends CrudRepository<PhieuBanGiao, Integer>{

}
