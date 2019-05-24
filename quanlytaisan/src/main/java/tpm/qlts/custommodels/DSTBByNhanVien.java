package tpm.qlts.custommodels;

public class DSTBByNhanVien {
	private String tenThietBi;
	private String tenNhanVien;
	private String giaTri;
	private String khauHao;
	private String ngayNhap;
	private String baoHanh;
	private String tenTinhTrang;
	private String tenNhaCungCap;
	private String maThietBi;

	public DSTBByNhanVien() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DSTBByNhanVien(String tenThietBi, String tenNhanVien, String giaTri, String khauHao, String ngayNhap,
			String baoHanh, String tenTinhTrang, String tenNhaCungCap) {
		super();
		this.tenThietBi = tenThietBi;
		this.tenNhanVien = tenNhanVien;
		this.giaTri = giaTri;
		this.khauHao = khauHao;
		this.ngayNhap = ngayNhap;
		this.baoHanh = baoHanh;
		this.tenTinhTrang = tenTinhTrang;
		this.tenNhaCungCap = tenNhaCungCap;
	}

	public String getMaThietBi() {
		return maThietBi;
	}

	public void setMaThietBi(String maThietBi) {
		this.maThietBi = maThietBi;
	}

	public String getTenThietBi() {
		return tenThietBi;
	}

	public void setTenThietBi(String tenThietBi) {
		this.tenThietBi = tenThietBi;
	}

	public String getTenNhanVien() {
		return tenNhanVien;
	}

	public void setTenNhanVien(String tenNhanVien) {
		this.tenNhanVien = tenNhanVien;
	}

	public String getGiaTri() {
		return giaTri;
	}

	public void setGiaTri(String giaTri) {
		this.giaTri = giaTri;
	}

	public String getKhauHao() {
		return khauHao;
	}

	public void setKhauHao(String khauHao) {
		this.khauHao = khauHao;
	}

	public String getNgayNhap() {
		return ngayNhap;
	}

	public void setNgayNhap(String ngayNhap) {
		this.ngayNhap = ngayNhap;
	}

	public String getBaoHanh() {
		return baoHanh;
	}

	public void setBaoHanh(String baoHanh) {
		this.baoHanh = baoHanh;
	}

	public String getTenTinhTrang() {
		return tenTinhTrang;
	}

	public void setTenTinhTrang(String tenTinhTrang) {
		this.tenTinhTrang = tenTinhTrang;
	}

	public String getTenNhaCungCap() {
		return tenNhaCungCap;
	}

	public void setTenNhaCungCap(String tenNhaCungCap) {
		this.tenNhaCungCap = tenNhaCungCap;
	}
}
