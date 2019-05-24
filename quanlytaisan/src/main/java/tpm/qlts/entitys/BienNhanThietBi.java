package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;

/**
 * The persistent class for the BienNhanThietBi database table.
 * 
 */
@Entity
@NamedQuery(name = "BienNhanThietBi.findAll", query = "SELECT b FROM BienNhanThietBi b")
public class BienNhanThietBi implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "MaBienNhan")
	private String maBienNhan;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "NgayBienNhan")
	private Date ngayBienNhan;

	// bi-directional many-to-one association to ChiTiet
	@JsonIgnore
	@OneToMany(mappedBy = "bienNhanThietBi")
	private List<ChiTiet> chiTiets;

	// bi-directional many-to-one association to ThietBi
	@JsonIgnore
	@OneToMany(mappedBy = "bienNhanThietBi")
	private List<ThietBi> thietBis;

	@Column(name = "NhaCungCap")
	private String maNCC;

	@Column(name = "inputtype")
	private String inputtype;

	@Column(name = "TongTien")
	private Float tongTien;

	@Column(name = "DiaDiemGiao")
	private String diaDiemGiao;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ThoiGianGiao")
	private Date thoiGianGiao;

	public BienNhanThietBi() {
	}

	public String getInputtype() {
		return inputtype;
	}

	public void setInputtype(String inputtype) {
		this.inputtype = inputtype;
	}

	public String getMaNCC() {
		return maNCC;
	}

	public void setMaNCC(String maNCC) {
		this.maNCC = maNCC;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getMaBienNhan() {
		return this.maBienNhan;
	}

	public void setMaBienNhan(String maBienNhan) {
		this.maBienNhan = maBienNhan;
	}

	public Date getNgayBienNhan() {
		return this.ngayBienNhan;
	}

	public void setNgayBienNhan(Date ngayBienNhan) {
		this.ngayBienNhan = ngayBienNhan;
	}

	public Float getTongTien() {
		return tongTien;
	}

	public void setTongTien(Float tongTien) {
		this.tongTien = tongTien;
	}

	public String getDiaDiemGiao() {
		return diaDiemGiao;
	}

	public void setDiaDiemGiao(String diaDiemGiao) {
		this.diaDiemGiao = diaDiemGiao;
	}

	public Date getThoiGianGiao() {
		return thoiGianGiao;
	}

	public void setThoiGianGiao(Date thoiGianGiao) {
		this.thoiGianGiao = thoiGianGiao;
	}

	public List<ChiTiet> getChiTiets() {
		return this.chiTiets;
	}

	public void setChiTiets(List<ChiTiet> chiTiets) {
		this.chiTiets = chiTiets;
	}

	public ChiTiet addChiTiet(ChiTiet chiTiet) {
		getChiTiets().add(chiTiet);
		chiTiet.setBienNhanThietBi(this);

		return chiTiet;
	}

	public ChiTiet removeChiTiet(ChiTiet chiTiet) {
		getChiTiets().remove(chiTiet);
		chiTiet.setBienNhanThietBi(null);

		return chiTiet;
	}

	public List<ThietBi> getThietBis() {
		return this.thietBis;
	}

	public void setThietBis(List<ThietBi> thietBis) {
		this.thietBis = thietBis;
	}

	public ThietBi addThietBi(ThietBi thietBi) {
		getThietBis().add(thietBi);
		thietBi.setBienNhanThietBi(this);

		return thietBi;
	}

	public ThietBi removeThietBi(ThietBi thietBi) {
		getThietBis().remove(thietBi);
		thietBi.setBienNhanThietBi(null);

		return thietBi;
	}

}