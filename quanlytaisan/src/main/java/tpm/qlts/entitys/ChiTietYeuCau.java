package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the ChiTietYeuCau database table.
 * 
 */
@Entity
@NamedQuery(name="ChiTietYeuCau.findAll", query="SELECT c FROM ChiTietYeuCau c")
public class ChiTietYeuCau implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="MaCT")
	private int maCT;

	@Column(name="DonViTInh")
	private int donViTInh;

	@Column(name="QuyCach_DatTinh")
	private String quyCach_DatTinh;

	@Column(name="SoLuong")
	private int soLuong;

	@Column(name="TenThietBi")
	private String tenThietBi;
	
	@Column(name="MaPhieu", insertable = false, updatable = false)
	private int maPhieu;

	//bi-directional many-to-one association to PhieuYeuCauThietBi
	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="MaPhieu")
	private PhieuYeuCauThietBi phieuYeuCauThietBi;

	public ChiTietYeuCau() {
	}

	public int getMaCT() {
		return this.maCT;
	}

	public void setMaCT(int maCT) {
		this.maCT = maCT;
	}

	public int getDonViTInh() {
		return this.donViTInh;
	}

	public void setDonViTInh(int donViTInh) {
		this.donViTInh = donViTInh;
	}

	public String getQuyCach_DatTinh() {
		return this.quyCach_DatTinh;
	}

	public void setQuyCach_DatTinh(String quyCach_DatTinh) {
		this.quyCach_DatTinh = quyCach_DatTinh;
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

	public PhieuYeuCauThietBi getPhieuYeuCauThietBi() {
		return this.phieuYeuCauThietBi;
	}

	public void setPhieuYeuCauThietBi(PhieuYeuCauThietBi phieuYeuCauThietBi) {
		this.phieuYeuCauThietBi = phieuYeuCauThietBi;
	}

	public int getMaPhieu() {
		return maPhieu;
	}

	public void setMaPhieu(int maPhieu) {
		this.maPhieu = maPhieu;
	}

	public ChiTietYeuCau(int maCT, int donViTInh, String quyCach_DatTinh, int soLuong, String tenThietBi, int maPhieu,
			PhieuYeuCauThietBi phieuYeuCauThietBi) {
		super();
		this.maCT = maCT;
		this.donViTInh = donViTInh;
		this.quyCach_DatTinh = quyCach_DatTinh;
		this.soLuong = soLuong;
		this.tenThietBi = tenThietBi;
		this.maPhieu = maPhieu;
		this.phieuYeuCauThietBi = phieuYeuCauThietBi;
	}
	
	

}