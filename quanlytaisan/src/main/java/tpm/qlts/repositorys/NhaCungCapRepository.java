package tpm.qlts.repositorys;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.NhaCungCap;

@Repository("nhaCungCapRepository")
public interface NhaCungCapRepository extends CrudRepository<NhaCungCap, String>{
	@Query(value = "select NhaCungCap.* from NhaCungCap where MaNCC = (select MaNCC from LoaiTB where MaLoai = ((select MaLoaiCha from LoaiTB where MaLoai = :MaLoaiCon)))", nativeQuery = true)
	public NhaCungCap getNhaCungCapByMaLoaiCon(@Param("MaLoaiCon") String maLoaiCon);
	
	@Query(value="select count(*) from NhaCungCap", nativeQuery = true)
	public int getTongNhaCungCap();
	
	@Query(value = "select TenNCC from NhaCungCap where MaNCC = (select MaNCC from LoaiTB where MaLoai = (select MaLoaiCha from LoaiTB where MaLoai =:MaLoai)) or MaNCC = (select MaNCC from LoaiTB where MaLoai =:MaLoai)", nativeQuery = true)
	public String getNhanCungCapByLoai(@Param("MaLoai") String maLoai);
}
