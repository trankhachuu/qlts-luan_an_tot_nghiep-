package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.ThietBi;

@Repository("thietBiRepository")
public interface ThietBiRepository extends JpaRepository<ThietBi, Long> {
	@Query(value = "select top 1 MaThietBi from ThietBi order by MaThietBi desc", nativeQuery = true)
	public long getMaxIDThietBi();

	@Query("select tb from PhongBan p JOIN p.nhanViens n Join n.nvTbs m Join m.thietBi tb Join tb.loaiTb l where p.maPhongBan =:maPhongBan and l.maLoai =:maLoai")
	public List<ThietBi> getAllThietBiByID(@Param("maPhongBan") String maPhongBan, @Param("maLoai") String maLoai);

	@Query("select tb from PhongBan p JOIN p.nhanViens n Join n.nvTbs m Join m.thietBi tb where p.maPhongBan =:maPhongBan")
	public List<ThietBi> getAllByIdthietBiPhongBan(@Param("maPhongBan") String maPhongBan);

	@Query(value = "select ThietBi.* from LoaiTB inner join ThietBi on (LoaiTB.MaLoai = ThietBi.MaLoai) where MaThietBi in ((select distinct NV_TB.MaThietBi from NV_TB inner join NhanVien on (NV_TB.MaNhanVien = NhanVien.MaNhanVien) inner join PhongBan on (NhanVien.MaPhongBan = PhongBan.MaPhongBan) where PhongBan.MaPhongBan = :maPhongBan and DenNgay is null))", nativeQuery = true)
	public List<ThietBi> getThietBiIdPhongBan(@Param("maPhongBan") String maPhongBan);

	@Query(value = "select ThietBi.* from LoaiTB inner join ThietBi on (LoaiTB.MaLoai = ThietBi.MaLoai)\r\n"
			+ "where MaThietBi in ((select MaThietBi from NV_TB where DenNgay is null)\r\n" + "INTERSECT \r\n"
			+ "(select NV_TB.MaThietBi from NV_TB inner join NhanVien on (NV_TB.MaNhanVien = NhanVien.MaNhanVien) inner join PhongBan on (NhanVien.MaPhongBan = PhongBan.MaPhongBan) where PhongBan.MaPhongBan =:maPhongBan)\r\n"
			+ "INTERSECT \r\n"
			+ "(select ThietBi.MaThietBi from LoaiTB inner join ThietBi on(LoaiTB.MaLoai = ThietBi.MaLoai) \r\n"
			+ "where LoaiTB.MaLoai =:maLoai))", nativeQuery = true)
	public List<ThietBi> getThietBiIdPhongBanIdLoai(@Param("maPhongBan") String maPhongBan,
			@Param("maLoai") String maLoai);

	@Query(value = "select TOP 1 dbo.getTenThietBi(MaThietBi) as TenThietBi from NV_TB where MaThietBi = :MaThietBi", nativeQuery = true)
	public String getTenThietBi(@Param("MaThietBi") long maThietBi);

	@Query(value = "select distinct ThietBi.MaThietBi from ThietBi inner join NV_TB on(ThietBi.MaThietBi = NV_TB.MaThietBi) where MaNhanVien = :MaNhanVien and DenNgay is null", nativeQuery = true)
	public long[] getListMaThietBiOfNhanVien(@Param("MaNhanVien") String maNhanVien);

	@Query(value = "select ThietBi.* from ThietBi inner join NV_TB on (ThietBi.MaThietBi = NV_TB.MaThietBi) where MaBanGiao = :MaBanGiao", nativeQuery = true)
	public List<ThietBi> getAllThietBiByPhieuBanGiao(@Param("MaBanGiao") int maBanGiao);

	@Query(value="select count(*) from ThietBi", nativeQuery=true)
	public int getMaxThietBi();
	

	@Query("SELECT tb FROM  ThietBi tb WHERE tb.tinhTrangKho = TRUE or tb.tinhTrangKho is null")
	public List<ThietBi> getAllThietBiByTinhTrang();
	
	@Query(value = "select tb.* from ThietBi as tb where tb.MaPhieuThanhLy IS NOT NULL", nativeQuery = true)
	public List<ThietBi> getAllThietBiByPhieuThanhLy();
	
	@Query(value = "select distinct ThietBi.* from ThietBi inner join NV_TB on(ThietBi.MaThietBi = NV_TB.MaThietBi) where MaNhanVien = :MaNhanVien", nativeQuery = true)
	public List<ThietBi> getThietBiByNhanVien(@Param("MaNhanVien") String maNhanVien);
}
