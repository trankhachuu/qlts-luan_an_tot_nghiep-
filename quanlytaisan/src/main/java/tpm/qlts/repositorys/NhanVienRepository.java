package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.NhanVien;

@Repository("nhanVienRepository")
public interface NhanVienRepository extends CrudRepository<NhanVien, String> {

	@Query("SELECT c FROM NhanVien c where c.tenNhanVien = :tenNhanVien")
	List<NhanVien> findNhanVienByName(@Param("tenNhanVien") String tenNhanVien);

	@Query("select n from PhongBan p inner join p.nhanViens n where p.maPhongBan= :maPhongBan")
	public List<NhanVien> getNhanVienRefPhongBan(@Param("maPhongBan") String maPhongBan);

	@Query(value = "select * from NhanVien where MaNhanVien <> 'RECORE_KHO' and MaNhanVien = (select TOP 1 MaNhanVien from NV_TB where MaThietBi = :maThietBi and DenNgay is null order by MaBanGiao desc)", nativeQuery = true)
	public NhanVien getNhanVienByMaThietBi(@Param("maThietBi") long maThietBi);

	@Query(value = "select count(*) from NhanVien where MaNhanVien <> 'RECORE_KHO'", nativeQuery = true)
	public int getTongNhanVien();

	@Query(value = "select TenNhanVien from NhanVien where MaNhanVien=:MaNhanVien", nativeQuery = true)
	public String getNhanVienByID(@Param("MaNhanVien") String maNhanVien);

	@Query("SELECT n FROM NhanVien n where n.maNhanVien <> 'RECORE_KHO'")
	public List<NhanVien> findAllTrue();
}
