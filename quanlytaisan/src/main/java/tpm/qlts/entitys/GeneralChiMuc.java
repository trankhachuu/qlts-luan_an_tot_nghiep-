package tpm.qlts.entitys;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "GeneralLoaiAuto")
public class GeneralChiMuc {
	@Id
	@Column(name = "id")
	private Integer id;

	@Column(name = "ChiMucChu")
	private String chiMucChu;

	@Column(name = "ChiMucSo")
	private Integer chiMucSo;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getChiMucChu() {
		return chiMucChu;
	}

	public void setChiMucChu(String chiMucChu) {
		this.chiMucChu = chiMucChu;
	}

	public Integer getChiMucSo() {
		return chiMucSo;
	}

	public void setChiMucSo(Integer chiMucSo) {
		this.chiMucSo = chiMucSo;
	}

}
