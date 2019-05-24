package tpm.qlts.entitys;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the PhieuBanGiao database table.
 * 
 */
@Entity
@NamedQuery(name="PhieuBanGiao.findAll", query="SELECT p FROM PhieuBanGiao p")
public class PhieuBanGiao implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="MaBanGiao")
	private int maBanGiao;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="NgayBanGiao")
	private Date ngayBanGiao;

	@Column(name="NguoiBanGiao")
	private String nguoiBanGiao;

	@Column(name="NoiDungBanGiao")
	private String noiDungBanGiao;

	@JsonIgnore
	@OneToMany(mappedBy="phieuBanGiao")
	private List<NhanVienRefThietBi> nvTbs;

	public PhieuBanGiao() {
	}

	public int getMaBanGiao() {
		return this.maBanGiao;
	}

	public void setMaBanGiao(int maBanGiao) {
		this.maBanGiao = maBanGiao;
	}

	public Date getNgayBanGiao() {
		return this.ngayBanGiao;
	}

	public void setNgayBanGiao(Date ngayBanGiao) {
		this.ngayBanGiao = ngayBanGiao;
	}

	public String getNguoiBanGiao() {
		return this.nguoiBanGiao;
	}

	public void setNguoiBanGiao(String nguoiBanGiao) {
		this.nguoiBanGiao = nguoiBanGiao;
	}

	public String getNoiDungBanGiao() {
		return this.noiDungBanGiao;
	}

	public void setNoiDungBanGiao(String noiDungBanGiao) {
		this.noiDungBanGiao = noiDungBanGiao;
	}

	public List<NhanVienRefThietBi> getNvTbs() {
		return this.nvTbs;
	}

	public void setNvTbs(List<NhanVienRefThietBi> nvTbs) {
		this.nvTbs = nvTbs;
	}

	public NhanVienRefThietBi addNvTb(NhanVienRefThietBi nvTb) {
		getNvTbs().add(nvTb);
		nvTb.setPhieuBanGiao(this);

		return nvTb;
	}

	public NhanVienRefThietBi removeNvTb(NhanVienRefThietBi nvTb) {
		getNvTbs().remove(nvTb);
		nvTb.setPhieuBanGiao(null);

		return nvTb;
	}

}