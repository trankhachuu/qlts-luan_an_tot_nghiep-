package tpm.qlts.custommodels;

import java.util.Date;

public class ChiTietPhieuBaoTri {
	private Date denNgay;

	private Date tuNgay;

	private String maTinhTrang;

	private String tenTinhTrang;

	private long maThietBi;

	private String tenThietBi;

	private int maPhieuBaoTri;

	public Date getDenNgay() {
		return denNgay;
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

	public void setDenNgay(Date denNgay) {
		this.denNgay = denNgay;
	}

	public Date getTuNgay() {
		return tuNgay;
	}

	public void setTuNgay(Date tuNgay) {
		this.tuNgay = tuNgay;
	}

	public String getMaTinhTrang() {
		return maTinhTrang;
	}

	public void setMaTinhTrang(String maTinhTrang) {
		this.maTinhTrang = maTinhTrang;
	}

	public long getMaThietBi() {
		return maThietBi;
	}

	public void setMaThietBi(long maThietBi) {
		this.maThietBi = maThietBi;
	}

	public int getMaPhieuBaoTri() {
		return maPhieuBaoTri;
	}

	public void setMaPhieuBaoTri(int maPhieuBaoTri) {
		this.maPhieuBaoTri = maPhieuBaoTri;
	}

	public ChiTietPhieuBaoTri() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ChiTietPhieuBaoTri(Date denNgay, Date tuNgay, String maTinhTrang, String tenTinhTrang, long maThietBi,
			String tenThietBi, int maPhieuBaoTri) {
		super();
		this.denNgay = denNgay;
		this.tuNgay = tuNgay;
		this.maTinhTrang = maTinhTrang;
		this.tenTinhTrang = tenTinhTrang;
		this.maThietBi = maThietBi;
		this.tenThietBi = tenThietBi;
		this.maPhieuBaoTri = maPhieuBaoTri;
	}

	

}
