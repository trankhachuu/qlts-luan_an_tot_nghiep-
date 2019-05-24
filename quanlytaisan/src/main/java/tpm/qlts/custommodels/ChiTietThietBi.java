package tpm.qlts.custommodels;

import java.util.Date;

public class ChiTietThietBi {
	private String tenThietBi;

	private long maThietBi;

	private int baoHanh;

	private double giaTri;

	private double khauHao;

	private Date ngayNhap;

	private String maTinhTrang;

	private String tenTinhTrang;

	public String getMaTinhTrang() {
		return maTinhTrang;
	}

	public void setMaTinhTrang(String maTinhTrang) {
		this.maTinhTrang = maTinhTrang;
	}

	public String getTenTinhTrang() {
		return tenTinhTrang;
	}

	public void setTenTinhTrang(String tenTinhTrang) {
		this.tenTinhTrang = tenTinhTrang;
	}

	public String getTenThietBi() {
		return tenThietBi;
	}

	public void setTenThietBi(String tenThietBi) {
		this.tenThietBi = tenThietBi;
	}

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

	public ChiTietThietBi() {
		super();
	}

	public ChiTietThietBi(String tenThietBi, long maThietBi, int baoHanh, double giaTri, double khauHao,
			Date ngayNhap) {
		super();
		this.tenThietBi = tenThietBi;
		this.maThietBi = maThietBi;
		this.baoHanh = baoHanh;
		this.giaTri = giaTri;
		this.khauHao = khauHao;
		this.ngayNhap = ngayNhap;
	}

	public ChiTietThietBi(String tenThietBi, long maThietBi, int baoHanh, double giaTri, double khauHao, Date ngayNhap,
			String maTinhTrang, String tenTinhTrang) {
		super();
		this.tenThietBi = tenThietBi;
		this.maThietBi = maThietBi;
		this.baoHanh = baoHanh;
		this.giaTri = giaTri;
		this.khauHao = khauHao;
		this.ngayNhap = ngayNhap;
		this.maTinhTrang = maTinhTrang;
		this.tenTinhTrang = tenTinhTrang;
	}

}
