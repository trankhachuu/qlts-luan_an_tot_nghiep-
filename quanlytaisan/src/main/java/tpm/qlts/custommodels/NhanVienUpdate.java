package tpm.qlts.custommodels;

import java.util.Date;

public class NhanVienUpdate {
	private String maNhanVien;
	private String tenNhanVien;
	private Date ngaySinh;
	private String queQuan;
	private String tenChucVu;
	private String tenPhongBan;
	public String getMaNhanVien() {
		return maNhanVien;
	}
	public void setMaNhanVien(String maNhanVien) {
		this.maNhanVien = maNhanVien;
	}
	public String getTenNhanVien() {
		return tenNhanVien;
	}
	public void setTenNhanVien(String tenNhanVien) {
		this.tenNhanVien = tenNhanVien;
	}
	public Date getNgaySinh() {
		return ngaySinh;
	}
	public void setNgaySinh(Date ngaySinh) {
		this.ngaySinh = ngaySinh;
	}
	public String getQueQuan() {
		return queQuan;
	}
	public void setQueQuan(String queQuan) {
		this.queQuan = queQuan;
	}
	public String getTenChucVu() {
		return tenChucVu;
	}
	public void setTenChucVu(String tenChucVu) {
		this.tenChucVu = tenChucVu;
	}
	public String getTenPhongBan() {
		return tenPhongBan;
	}
	public void setTenPhongBan(String tenPhongBan) {
		this.tenPhongBan = tenPhongBan;
	}
	
	public NhanVienUpdate() {
		super();
		// TODO Auto-generated constructor stub
	}
	public NhanVienUpdate(String maNhanVien, String tenNhanVien, Date ngaySinh, String queQuan, String tenChucVu,
			String tenPhongBan) {
		super();
		this.maNhanVien = maNhanVien;
		this.tenNhanVien = tenNhanVien;
		this.ngaySinh = ngaySinh;
		this.queQuan = queQuan;
		this.tenChucVu = tenChucVu;
		this.tenPhongBan = tenPhongBan;
	}
	
	
	
}
