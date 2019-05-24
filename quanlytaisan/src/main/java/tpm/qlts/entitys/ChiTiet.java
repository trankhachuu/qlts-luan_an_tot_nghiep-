package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The persistent class for the ChiTiet database table.
 * 
 */
@Entity
@NamedQuery(name = "ChiTiet.findAll", query = "SELECT c FROM ChiTiet c")
public class ChiTiet implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "MaCT")
	private int maCT;

	@Column(name = "DonViTinh")
	private int donViTinh;

	@Column(name = "SoLuong")
	private int soLuong;

	@Column(name = "TenThietBi")
	private String tenThietBi;

	@Column(name = "GiaTri")
	private float giaTri;

	// bi-directional many-to-one association to BienNhanThietBi
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MaBienNhan")
	private BienNhanThietBi bienNhanThietBi;

	public ChiTiet() {
	}

	public float getGiaTri() {
		return giaTri;
	}

	public void setGiaTri(float giaTri) {
		this.giaTri = giaTri;
	}

	public int getMaCT() {
		return this.maCT;
	}

	public void setMaCT(int maCT) {
		this.maCT = maCT;
	}

	public int getDonViTinh() {
		return this.donViTinh;
	}

	public void setDonViTinh(int donViTinh) {
		this.donViTinh = donViTinh;
	}

	public int getSoLuong() {
		return this.soLuong;
	}

	public void setSoLuong(int soLuong) {
		this.soLuong = soLuong;
	}

	public String getTenThietBi() {
		return this.tenThietBi;
	}

	public void setTenThietBi(String tenThietBi) {
		this.tenThietBi = tenThietBi;
	}

	public BienNhanThietBi getBienNhanThietBi() {
		return this.bienNhanThietBi;
	}

	public void setBienNhanThietBi(BienNhanThietBi bienNhanThietBi) {
		this.bienNhanThietBi = bienNhanThietBi;
	}

}