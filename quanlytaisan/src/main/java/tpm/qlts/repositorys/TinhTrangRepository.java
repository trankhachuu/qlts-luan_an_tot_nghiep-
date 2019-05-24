package tpm.qlts.repositorys;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.TinhTrang;

@Repository("tinhTrangRepository")
public interface TinhTrangRepository extends CrudRepository<TinhTrang, String> {

	@Query(value = "select dbo.checkTinhTrang(:idThietBi)", nativeQuery = true)
	public String getTenTinhTrangByIDThietBi(@Param("idThietBi") long idThietBi);
	
	@Query(value = "select TenTinhTrang from TinhTrang inner join TT_TB on (TinhTrang.MaTinhTrang = TT_TB.MaTinhTrang) where MaThietBi=:MaThietBi and DenNgay is null", nativeQuery = true)
	public String getTinhTrangByITb(@Param("MaThietBi") long maThietBi); 
}