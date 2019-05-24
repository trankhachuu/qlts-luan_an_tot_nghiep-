package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@NamedQuery(name = "LoaiTB.findAll", query = "SELECT l FROM LoaiTB l")
public class LoaiTB implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "MaLoai")
	private String maLoai;

	@Column(name = "MoTa")
	private String moTa;

	@Column(name = "TenLoai")
	private String tenLoai;

	@Column(name = "MaLoaiCha", insertable = false, updatable = false)
	private String maLoaiCha;

	@Column(name = "MaNCC", insertable = false, updatable = false)
	private String maNCC;

	// bi-directional many-to-one association to LoaiTB
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "MaLoaiCha")
	private LoaiTB loaiTb;

	// bi-directional many-to-one association to LoaiTB
	@JsonIgnore
	@OneToMany(mappedBy = "loaiTb")
	private List<LoaiTB> loaiTbs;

	// bi-directional many-to-one association to NhaCungCap
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "MaNCC")
	private NhaCungCap nhaCungCap;

	// bi-directional many-to-one association to ThietBi
	@JsonIgnore
	@OneToMany(mappedBy = "loaiTb")
	private List<ThietBi> thietBis;

	public LoaiTB() {
	}

	public String getMaLoai() {
		return this.maLoai;
	}

	public void setMaLoai(String maLoai) {
		this.maLoai = maLoai;
	}

	public String getMoTa() {
		return this.moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}

	public String getTenLoai() {
		return this.tenLoai;
	}

	public void setTenLoai(String tenLoai) {
		this.tenLoai = tenLoai;
	}

	public LoaiTB getLoaiTb() {
		return this.loaiTb;
	}

	public void setLoaiTb(LoaiTB loaiTb) {
		this.loaiTb = loaiTb;
	}

	public List<LoaiTB> getLoaiTbs() {
		return this.loaiTbs;
	}

	public void setLoaiTbs(List<LoaiTB> loaiTbs) {
		this.loaiTbs = loaiTbs;
	}

	public LoaiTB addLoaiTb(LoaiTB loaiTb) {
		getLoaiTbs().add(loaiTb);
		loaiTb.setLoaiTb(this);

		return loaiTb;
	}

	public LoaiTB removeLoaiTb(LoaiTB loaiTb) {
		getLoaiTbs().remove(loaiTb);
		loaiTb.setLoaiTb(null);

		return loaiTb;
	}

	public NhaCungCap getNhaCungCap() {
		return this.nhaCungCap;
	}

	public void setNhaCungCap(NhaCungCap nhaCungCap) {
		this.nhaCungCap = nhaCungCap;
	}

	public List<ThietBi> getThietBis() {
		return this.thietBis;
	}

	public void setThietBis(List<ThietBi> thietBis) {
		this.thietBis = thietBis;
	}

	public ThietBi addThietBi(ThietBi thietBi) {
		getThietBis().add(thietBi);
		thietBi.setLoaiTb(this);

		return thietBi;
	}

	public ThietBi removeThietBi(ThietBi thietBi) {
		getThietBis().remove(thietBi);
		thietBi.setLoaiTb(null);

		return thietBi;
	}

	public String getMaLoaiCha() {
		return maLoaiCha;
	}

	public void setMaLoaiCha(String maLoaiCha) {
		this.maLoaiCha = maLoaiCha;
	}

	public String getMaNCC() {
		return maNCC;
	}

	public void setMaNCC(String maNCC) {
		this.maNCC = maNCC;
	}

}