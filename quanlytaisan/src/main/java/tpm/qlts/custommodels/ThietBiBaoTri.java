package tpm.qlts.custommodels;

import java.sql.Date;

public class ThietBiBaoTri {

	private long maThietBi;
	private int baoHanh;
	private double giaTri;
	private double khauHao;
	private Date ngayNhap;
	private String maTT;

	public long getMaThietBi() {
		return maThietBi;
	}

	public void setMaThietBi(long maThietBi) {
		this.maThietBi = maThietBi;
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

	public Date getNgayNhap() {
		return ngayNhap;
	}

	public void setNgayNhap(Date ngayNhap) {
		this.ngayNhap = ngayNhap;
	}

	public String getMaTT() {
		return maTT;
	}

	public void setMaTT(String maTT) {
		this.maTT = maTT;
	}

	public ThietBiBaoTri() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ThietBiBaoTri(long maThietBi, int baoHanh, double giaTri, double khauHao, Date ngayNhap, String maTT) {
		super();
		this.maThietBi = maThietBi;
		this.baoHanh = baoHanh;
		this.giaTri = giaTri;
		this.khauHao = khauHao;
		this.ngayNhap = ngayNhap;
		this.maTT = maTT;
	}

}
