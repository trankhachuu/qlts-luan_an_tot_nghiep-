package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.LoaiTB;

@Repository("loaiThietBiRepository")
public interface LoaiThietBiRepository extends CrudRepository<LoaiTB, String> {
	
	@Query("select c from LoaiTB c where c.maLoaiCha = null") //  c.maloaicha c là đại diện cho modul loaitb tại maloaicha bằng null thì mới lấy ra
	public List<LoaiTB> getLoaitbcha();
	
	@Query("select t from LoaiTB t where t.maLoaiCha = :maLoai") // lấy những loaitb từ bảng loaitb sao cho loaitb đó có maloaicha = maloai vừa truyền vào
	public List<LoaiTB> gettbbymaloai(@Param("maLoai") String maLoai);
	
	@Query("select c from LoaiTB c where c.maLoaiCha <> null")
	public List<LoaiTB> getLoaiTBSub();
	
	@Query("select c from LoaiTB c where c.maLoaiCha = null")
	public List<LoaiTB> getLoaiTBCha();
	
	@Query(value = "select top 1 ChiMucChu from GeneralLoaiAuto where id = 1", nativeQuery = true)
	public String getChiMucChu();
	
	@Query(value = "select top 1 ChiMucSo from GeneralLoaiAuto where id = 1", nativeQuery = true)
	public int getChiMucSo();

}
