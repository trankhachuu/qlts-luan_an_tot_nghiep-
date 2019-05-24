package tpm.qlts.repositorys;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import tpm.qlts.entitys.GeneralChiMuc;

@Repository("chiMucLoaiRepository")
public interface ChiMucLoaiRepository extends CrudRepository<GeneralChiMuc, Integer> {

	@Query("select c from GeneralChiMuc c where c.id = 1")
	public GeneralChiMuc getChiMucChu();

	@Query("select c.chiMucSo from GeneralChiMuc c where c.id = 1")
	public int getChiMucSo();
}
