package tpm.qlts.custommodels;

import java.util.Date;

public class ThietBiChiTiet {
	private String maTB; 
	private String tenThietBi;
	private int baoHanh;
	private double giaTri;
	private double khauHao;
	private String maLoai; 
	private Date ngayNhap;
	private String trangThai;

	public String getMaTB() {
		return maTB;
	}

	public void setMaTB(String maTB) {
		this.maTB = maTB;
	}

	public String getTenThietBi() {
		return tenThietBi;
	}

	public void setTenThietBi(String tenThietBi) {
		this.tenThietBi = tenThietBi;
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

	public String getMaLoai() {
		return maLoai;
	}

	public void setMaLoai(String maLoai) {
		this.maLoai = maLoai;
	}

	public Date getNgayNhap() {
		return ngayNhap;
	}

	public void setNgayNhap(Date ngayNhap) {
		this.ngayNhap = ngayNhap;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public ThietBiChiTiet(String maTB, String tenThietBi, int baoHanh, double giaTri, double khauHao, String maLoai,
			Date ngayNhap, String trangThai) {
		super();
		this.maTB = maTB;
		this.tenThietBi = tenThietBi;
		this.baoHanh = baoHanh;
		this.giaTri = giaTri;
		this.khauHao = khauHao;
		this.maLoai = maLoai;
		this.ngayNhap = ngayNhap;
		this.trangThai = trangThai;
	}

	public ThietBiChiTiet() {
		super();
		// TODO Auto-generated constructor stub
	}

}