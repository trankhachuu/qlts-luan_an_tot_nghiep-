package tpm.qlts.custommodels;


public class DisplayThietBi {
	private String maTB;
	private String tenThietBi;
	private int baoHanh;
	private double giaTri;
	private double khauHao;
	private String ngayNhap;
	private String tenDonViTinh;
	private String tenPhongBan;
	private String tenTinhTrang;
	public String getTenThietBi() {
		return tenThietBi;
	}
	public void setTenThietBi(String tenThietBi) {
		this.tenThietBi = tenThietBi;
	}
	
	public String getMaTB() {
		return maTB;
	}
	public void setMaTB(String maTB) {
		this.maTB = maTB;
	}
	public int getBaoHanh() {
		return baoHanh;
	}
	public void setBaoHanh(int baoHanh) {
		this.baoHanh = baoHanh;
	}
	public double getGiaTri() {
		return giaTri;
	}
	public void setGiaTri(double giaTri) {
		this.giaTri = giaTri;
	}
	public double getKhauHao() {
		return khauHao;
	}
	public void setKhauHao(double khauHao) {
		this.khauHao = khauHao;
	}
	
	public String getNgayNhap() {
		return ngayNhap;
	}
	public void setNgayNhap(String ngayNhap) {
		this.ngayNhap = ngayNhap;
	}
	public String getTenDonViTinh() {
		return tenDonViTinh;
	}
	public void setTenDonViTinh(String tenDonViTinh) {
		this.tenDonViTinh = tenDonViTinh;
	}
	public String getTenPhongBan() {
		return tenPhongBan;
	}
	public void setTenPhongBan(String tenPhongBan) {
		this.tenPhongBan = tenPhongBan;
	}
	public String getTenTinhTrang() {
		return tenTinhTrang;
	}
	public void setTenTinhTrang(String tenTinhTrang) {
		this.tenTinhTrang = tenTinhTrang;
	}
	
	public DisplayThietBi(String maTB, String tenThietBi, int baoHanh, double giaTri, double khauHao, String ngayNhap,
			String tenDonViTinh, String tenPhongBan, String tenTinhTrang) {
		super();
		this.maTB = maTB;
		this.tenThietBi = tenThietBi;
		this.baoHanh = baoHanh;
		this.giaTri = giaTri;
		this.khauHao = khauHao;
		this.ngayNhap = ngayNhap;
		this.tenDonViTinh = tenDonViTinh;
		this.tenPhongBan = tenPhongBan;
		this.tenTinhTrang = tenTinhTrang;
	}
	public DisplayThietBi() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
