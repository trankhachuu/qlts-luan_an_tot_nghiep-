package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;

/**
 * The persistent class for the PhieuBaoTri database table.
 * 
 */
@Entity
@NamedQuery(name = "PhieuBaoTri.findAll", query = "SELECT p FROM PhieuBaoTri p")
public class PhieuBaoTri implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MaPhieuBaoTri")
	private int maPhieuBaoTri;

	@Column(name = "DiaChiBaoTri")
	private String diaChiBaoTri;

	@Column(name = "MaNhanVienChiuTrachNhiem")
	private String maNhanVienChiuTrachNhiem;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "NgayBaoTri")
	private Date ngayBaoTri;

	@Column(name = "NoiBaoTri")
	private String noiBaoTri;

	@Column(name = "PhiBaoTri")
	private double phiBaoTri;

	@Column(name = "TinhTrangPhieu")
	private String tinhTrangPhieu;

	public PhieuBaoTri() {
	}

	public int getMaPhieuBaoTri() {
		return this.maPhieuBaoTri;
	}

	public String getTinhTrangPhieu() {
		return tinhTrangPhieu;
	}

	public void setTinhTrangPhieu(String tinhTrangPhieu) {
		this.tinhTrangPhieu = tinhTrangPhieu;
	}

	public void setMaPhieuBaoTri(int maPhieuBaoTri) {
		this.maPhieuBaoTri = maPhieuBaoTri;
	}

	public String getDiaChiBaoTri() {
		return this.diaChiBaoTri;
	}

	public void setDiaChiBaoTri(String diaChiBaoTri) {
		this.diaChiBaoTri = diaChiBaoTri;
	}

	public String getMaNhanVienChiuTrachNhiem() {
		return this.maNhanVienChiuTrachNhiem;
	}

	public void setMaNhanVienChiuTrachNhiem(String maNhanVienChiuTrachNhiem) {
		this.maNhanVienChiuTrachNhiem = maNhanVienChiuTrachNhiem;
	}

	public Date getNgayBaoTri() {
		return this.ngayBaoTri;
	}

	public void setNgayBaoTri(Date ngayBaoTri) {
		this.ngayBaoTri = ngayBaoTri;
	}

	public String getNoiBaoTri() {
		return this.noiBaoTri;
	}

	public void setNoiBaoTri(String noiBaoTri) {
		this.noiBaoTri = noiBaoTri;
	}

	public double getPhiBaoTri() {
		return this.phiBaoTri;
	}

	public void setPhiBaoTri(double phiBaoTri) {
		this.phiBaoTri = phiBaoTri;
	}

	public PhieuBaoTri(String tinhTrangPhieu) {
		super();
		this.tinhTrangPhieu = tinhTrangPhieu;
	}
	
	

}
