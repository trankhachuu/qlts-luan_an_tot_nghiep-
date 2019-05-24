package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;

/**
 * The persistent class for the ThietBi database table.
 * 
 */
@Entity
@NamedQuery(name = "ThietBi.findAll", query = "SELECT t FROM ThietBi t")
public class ThietBi implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "MaThietBi")
	private long maThietBi;

	@Column(name = "BaoHanh")
	private int baoHanh;

	@Column(name = "GiaTri")
	private double giaTri;

	@Column(name = "KhauHao")
	private double khauHao;

	@Column(name = "MaLoai", updatable = false, insertable = false)
	private String maLoai;

	@Column(name = "TinhTrangKho", nullable = true)
	private Boolean tinhTrangKho;

	public String getMaLoai() {
		return maLoai;
	}

	public void setMaLoai(String maLoai) {
		this.maLoai = maLoai;
	}

	public Boolean isTinhTrangKho() {
		return tinhTrangKho;
	}

	public void setTinhTrangKho(Boolean tinhTrangKho) {
		this.tinhTrangKho = tinhTrangKho;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "NgayNhap")
	private Date ngayNhap;

	// bi-directional many-to-one association to NhanVienRefThietBi
	@JsonIgnore
	@OneToMany(mappedBy = "thietBi")
	private List<NhanVienRefThietBi> nvTbs;

	// bi-directional many-to-one association to TinhTrangRefThietBi
	@JsonIgnore
	@OneToMany(mappedBy = "thietBi")
	private List<TinhTrangRefThietBi> ttTbs;

	// bi-directional many-to-one association to BienNhanThietBi
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MaBienNhan")
	private BienNhanThietBi bienNhanThietBi;

	// bi-directional many-to-one association to DonViTinh
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MaDonViTinh")
	private DonViTinh donViTinh;

	// bi-directional many-to-one association to LoaiTB
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MaLoai")
	private LoaiTB loaiTb;

	// bi-directional many-to-one association to PhieuThanhLy
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MaPhieuThanhLy")
	private PhieuThanhLy phieuThanhLy;

	public ThietBi() {
	}

	public long getMaThietBi() {
		return this.maThietBi;
	}

	public void setMaThietBi(long maThietBi) {
		this.maThietBi = maThietBi;
	}

	public int getBaoHanh() {
		return this.baoHanh;
	}

	public void setBaoHanh(int baoHanh) {
		this.baoHanh = baoHanh;
	}

	public double getGiaTri() {
		return this.giaTri;
	}

	public void setGiaTri(double giaTri) {
		this.giaTri = giaTri;
	}

	public double getKhauHao() {
		return this.khauHao;
	}

	public void setKhauHao(double khauHao) {
		this.khauHao = khauHao;
	}

	public Date getNgayNhap() {
		return this.ngayNhap;
	}

	public void setNgayNhap(Date ngayNhap) {
		this.ngayNhap = ngayNhap;
	}

	public List<NhanVienRefThietBi> getNvTbs() {
		return this.nvTbs;
	}

	public void setNvTbs(List<NhanVienRefThietBi> nvTbs) {
		this.nvTbs = nvTbs;
	}

	public NhanVienRefThietBi addNvTb(NhanVienRefThietBi nvTb) {
		getNvTbs().add(nvTb);
		nvTb.setThietBi(this);

		return nvTb;
	}

	public NhanVienRefThietBi removeNvTb(NhanVienRefThietBi nvTb) {
		getNvTbs().remove(nvTb);
		nvTb.setThietBi(null);

		return nvTb;
	}

	public List<TinhTrangRefThietBi> getTtTbs() {
		return this.ttTbs;
	}

	public void setTtTbs(List<TinhTrangRefThietBi> ttTbs) {
		this.ttTbs = ttTbs;
	}

	public TinhTrangRefThietBi addTtTb(TinhTrangRefThietBi ttTb) {
		getTtTbs().add(ttTb);
		ttTb.setThietBi(this);

		return ttTb;
	}

	public TinhTrangRefThietBi removeTtTb(TinhTrangRefThietBi ttTb) {
		getTtTbs().remove(ttTb);
		ttTb.setThietBi(null);

		return ttTb;
	}

	public BienNhanThietBi getBienNhanThietBi() {
		return this.bienNhanThietBi;
	}

	public void setBienNhanThietBi(BienNhanThietBi bienNhanThietBi) {
		this.bienNhanThietBi = bienNhanThietBi;
	}

	public DonViTinh getDonViTinh() {
		return this.donViTinh;
	}

	public void setDonViTinh(DonViTinh donViTinh) {
		this.donViTinh = donViTinh;
	}

	public LoaiTB getLoaiTb() {
		return this.loaiTb;
	}

	public void setLoaiTb(LoaiTB loaiTb) {
		this.loaiTb = loaiTb;
	}

	public PhieuThanhLy getPhieuThanhLy() {
		return this.phieuThanhLy;
	}

	public void setPhieuThanhLy(PhieuThanhLy phieuThanhLy) {
		this.phieuThanhLy = phieuThanhLy;
	}

	public ThietBi(long maThietBi, int baoHanh, double giaTri, double khauHao, Date ngayNhap,
			BienNhanThietBi bienNhanThietBi, DonViTinh donViTinh, LoaiTB loaiTb) {
		super();
		this.maThietBi = maThietBi;
		this.baoHanh = baoHanh;
		this.giaTri = giaTri;
		this.khauHao = khauHao;
		this.ngayNhap = ngayNhap;
		this.bienNhanThietBi = bienNhanThietBi;
		this.donViTinh = donViTinh;
		this.loaiTb = loaiTb;
	}

}