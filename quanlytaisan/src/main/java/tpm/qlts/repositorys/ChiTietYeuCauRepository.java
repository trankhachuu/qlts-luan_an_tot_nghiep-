package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import tpm.qlts.entitys.ChiTietYeuCau;

@Repository("chiTietYeuCauRepository")
public interface ChiTietYeuCauRepository extends CrudRepository<ChiTietYeuCau, Integer>{
	
	@Query("select c from ChiTietYeuCau c where c.maPhieu = :maPhieu")
	public List<ChiTietYeuCau> getAllByIdPhieu(@Param("maPhieu") int maPhieu);

}
