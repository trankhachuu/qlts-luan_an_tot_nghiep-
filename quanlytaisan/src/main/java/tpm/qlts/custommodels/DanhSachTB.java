package tpm.qlts.custommodels;

public class DanhSachTB {
	private long maThietBi;
	private String tenLoai;
	
	public long getMaThietBi() {
		return maThietBi;
	}
	public void setMaThietBi(long maThietBi) {
		this.maThietBi = maThietBi;
	}
	public String getTenLoai() {
		return tenLoai;
	}
	public void setTenLoai(String tenLoai) {
		this.tenLoai = tenLoai;
	}
	public DanhSachTB(long maThietBi, String tenLoai) {
		super();
		this.maThietBi = maThietBi;
		this.tenLoai = tenLoai;
	}
	public DanhSachTB() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
