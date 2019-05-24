package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * The persistent class for the PhongBan database table.
 * 
 */
@Entity
@NamedQuery(name = "PhongBan.findAll", query = "SELECT p FROM PhongBan p")
public class PhongBan implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "MaPhongBan")
	private String maPhongBan;

	@Column(name = "TenPhongBan")
	private String tenPhongBan;

	// bi-directional many-to-one association to NhanVien
	@JsonIgnore
	@OneToMany(mappedBy = "phongBan")
	private List<NhanVien> nhanViens;

	public PhongBan() {
	}

	public String getMaPhongBan() {
		return this.maPhongBan;
	}

	public void setMaPhongBan(String maPhongBan) {
		this.maPhongBan = maPhongBan;
	}

	public String getTenPhongBan() {
		return this.tenPhongBan;
	}

	public void setTenPhongBan(String tenPhongBan) {
		this.tenPhongBan = tenPhongBan;
	}

	public List<NhanVien> getNhanViens() {
		return this.nhanViens;
	}

	public void setNhanViens(List<NhanVien> nhanViens) {
		this.nhanViens = nhanViens;
	}

	public NhanVien addNhanVien(NhanVien nhanVien) {
		getNhanViens().add(nhanVien);
		nhanVien.setPhongBan(this);

		return nhanVien;
	}

	public NhanVien removeNhanVien(NhanVien nhanVien) {
		getNhanViens().remove(nhanVien);
		nhanVien.setPhongBan(null);

		return nhanVien;
	}

	public PhongBan(String maPhongBan) {
		super();
		this.maPhongBan = maPhongBan;
	}

}