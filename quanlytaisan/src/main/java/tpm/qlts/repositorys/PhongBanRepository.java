package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.PhongBan;

@Repository("phongBanRepository")
public interface PhongBanRepository extends CrudRepository<PhongBan, String> {

	@Query("SELECT p FROM PhongBan p ORDER BY p.tenPhongBan DESC")
	List<PhongBan> findAll();

	@Query("select p from PhongBan p JOIN p.nhanViens n Join n.nvTbs m Join m.thietBi tb where tb.maThietBi =:maThietBi")
	public PhongBan getByIdThietBi(@Param("maThietBi") long maThietBi);

	@Query(value = "select * from PhongBan where MaPhongBan = (select TOP 1 MaPhongBan from NhanVien where MaNhanVien = :MaNhanVien)", nativeQuery = true)
	public PhongBan getPhongBanByNhanVienID(@Param("MaNhanVien") String maNhanVien);
	
	@Query(value = "select * from PhongBan where MaPhongBan = (select TOP 1 MaPhongBan from NhanVien where MaNhanVien = (select TOP 1 MaNhanVien from NV_TB where MaThietBi = :MaThietBi and DenNgay is null))", nativeQuery=true)
	public PhongBan getPhongBanByThietBiID(@Param("MaThietBi") long maThietBi);
	
	@Query(value = "select * from PhongBan inner join NhanVien on (PhongBan.MaPhongBan = NhanVien.MaPhongBan) where MaNhanVien = ((select TOP 1 MaNhanVien from NV_TB where MaThietBi = :MaThietBi and DenNgay is null order by MaBanGiao desc))", nativeQuery = true)
	public PhongBan getPhongBanByMaThietBi(@Param("MaThietBi") long maThietBi);
	
	@Query(value= "select count(*) from PhongBan", nativeQuery = true)
	public int getTongPhongBan();
}
