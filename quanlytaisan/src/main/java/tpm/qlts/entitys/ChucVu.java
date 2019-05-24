package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * The persistent class for the ChucVu database table.
 * 
 */
@Entity
@NamedQuery(name = "ChucVu.findAll", query = "SELECT c FROM ChucVu c")
public class ChucVu implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MaChucVu")
	private int maChucVu;

	@Column(name = "MoTa")
	private String moTa;

	@Column(name = "TenChucVu")
	private String tenChucVu;

	// bi-directional many-to-one association to NhanVien
	@JsonIgnore
	@OneToMany(mappedBy = "chucVu")
	private List<NhanVien> nhanViens;

	public ChucVu() {
	}

	public int getMaChucVu() {
		return this.maChucVu;
	}

	public void setMaChucVu(int maChucVu) {
		this.maChucVu = maChucVu;
	}

	public String getMoTa() {
		return this.moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}

	public String getTenChucVu() {
		return this.tenChucVu;
	}

	public void setTenChucVu(String tenChucVu) {
		this.tenChucVu = tenChucVu;
	}

	public List<NhanVien> getNhanViens() {
		return this.nhanViens;
	}

	public void setNhanViens(List<NhanVien> nhanViens) {
		this.nhanViens = nhanViens;
	}

	public NhanVien addNhanVien(NhanVien nhanVien) {
		getNhanViens().add(nhanVien);
		nhanVien.setChucVu(this);

		return nhanVien;
	}

	public ChucVu(int maChucVu) {
		super();
		this.maChucVu = maChucVu;
	}

	public NhanVien removeNhanVien(NhanVien nhanVien) {
		getNhanViens().remove(nhanVien);
		nhanVien.setChucVu(null);

		return nhanVien;
	}

}