package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the NhaCungCap database table.
 * 
 */
@Entity
@NamedQuery(name="NhaCungCap.findAll", query="SELECT n FROM NhaCungCap n")
public class NhaCungCap implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="MaNCC")
	private String maNCC;

	@Column(name="DiaChi")
	private String diaChi;

	@Column(name="TenNCC")
	private String tenNCC;

	//bi-directional many-to-one association to LoaiTB
	@OneToMany(mappedBy="nhaCungCap")
	private List<LoaiTB> loaiTbs;

	public NhaCungCap() {
	}

	public String getMaNCC() {
		return this.maNCC;
	}

	public void setMaNCC(String maNCC) {
		this.maNCC = maNCC;
	}

	public String getDiaChi() {
		return this.diaChi;
	}

	public void setDiaChi(String diaChi) {
		this.diaChi = diaChi;
	}

	public String getTenNCC() {
		return this.tenNCC;
	}

	public void setTenNCC(String tenNCC) {
		this.tenNCC = tenNCC;
	}

	public List<LoaiTB> getLoaiTbs() {
		return this.loaiTbs;
	}

	public void setLoaiTbs(List<LoaiTB> loaiTbs) {
		this.loaiTbs = loaiTbs;
	}

	public LoaiTB addLoaiTb(LoaiTB loaiTb) {
		getLoaiTbs().add(loaiTb);
		loaiTb.setNhaCungCap(this);

		return loaiTb;
	}

	public LoaiTB removeLoaiTb(LoaiTB loaiTb) {
		getLoaiTbs().remove(loaiTb);
		loaiTb.setNhaCungCap(null);

		return loaiTb;
	}

}