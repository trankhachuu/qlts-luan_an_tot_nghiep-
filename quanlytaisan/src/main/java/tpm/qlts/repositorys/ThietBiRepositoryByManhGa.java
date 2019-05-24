package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.ThietBi;

@Repository("thietBiRepositoryByManhGa")
public interface ThietBiRepositoryByManhGa extends ThietBiRepository {
	
//	@Query(value = "select ThietBi.* from ThietBi inner join LoaiTB on (ThietBi.MaLoai = LoaiTB.MaLoai) where (TinhTrangKho = 1 or TinhTrangKho is null) and LoaiTB.MaLoaiCha in (select MaLoai from LoaiTB where MaLoaiCha is null and MaNCC = :MaNCC)", nativeQuery = true)
	@Query(value = "select ThietBi.* from ThietBi where (TinhTrangKho = 1 or TinhTrangKho is null) and MaLoai in (select MaLoai from LoaiTB where MaLoaiCha is not null and MaLoaiCha in (select MaLoai from LoaiTB where MaLoaiCha is null and MaNCC = :MaNCC))", nativeQuery = true)
	public List<ThietBi> getThietBiByNhaCungCap(@Param("MaNCC") String MaNCC);

	@Query(value = "select ThietBi.* from ThietBi inner join LoaiTB on (ThietBi.MaLoai = LoaiTB.MaLoai) where (TinhTrangKho = 1 or TinhTrangKho is null) and LoaiTB.MaLoaiCha in (select MaLoai from LoaiTB where MaLoaiCha is null and MaNCC = :MaNCC) and LoaiTB.MaLoaiCha = :MaLoai", nativeQuery = true)
	public List<ThietBi> getThietBiByNCCAndMaLoai(@Param("MaNCC") String MaNCC, @Param("MaLoai") String MaLoai);
}
