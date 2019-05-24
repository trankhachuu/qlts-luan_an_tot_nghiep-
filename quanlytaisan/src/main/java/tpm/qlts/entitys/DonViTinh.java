package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the DonViTinh database table.
 * 
 */
@Entity
@NamedQuery(name="DonViTinh.findAll", query="SELECT d FROM DonViTinh d")
public class DonViTinh implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="MaDonViTinh")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int maDonViTinh;

	@Column(name="MoTa")
	private String moTa;

	@Column(name="TenDonViTinh")
	private String tenDonViTinh;

	//bi-directional many-to-one association to ThietBi
	@JsonIgnore
	@OneToMany(mappedBy="donViTinh")
	private List<ThietBi> thietBis;

	public DonViTinh() {
	}

	public int getMaDonViTinh() {
		return this.maDonViTinh;
	}

	public void setMaDonViTinh(int maDonViTinh) {
		this.maDonViTinh = maDonViTinh;
	}

	public String getMoTa() {
		return this.moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}

	public String getTenDonViTinh() {
		return this.tenDonViTinh;
	}

	public void setTenDonViTinh(String tenDonViTinh) {
		this.tenDonViTinh = tenDonViTinh;
	}

	public List<ThietBi> getThietBis() {
		return this.thietBis;
	}

	public void setThietBis(List<ThietBi> thietBis) {
		this.thietBis = thietBis;
	}

	public ThietBi addThietBi(ThietBi thietBi) {
		getThietBis().add(thietBi);
		thietBi.setDonViTinh(this);
		return thietBi;
	}

	public ThietBi removeThietBi(ThietBi thietBi) {
		getThietBis().remove(thietBi);
		thietBi.setDonViTinh(null);

		return thietBi;
	}
}