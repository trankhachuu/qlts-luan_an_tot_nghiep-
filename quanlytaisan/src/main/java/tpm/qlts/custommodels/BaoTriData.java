package tpm.qlts.custommodels;

import java.util.Date;
import java.util.List;

public class BaoTriData {
	public int maPhieuBaoTri;
	public Date ngayBaoTri;
	public String maNhanVienChiuTrachNhiem;
	public String noiBaoTri;
	public String diaChiBaoTri;
	public float phiBaoTri;

	public java.util.List<ChiTietThietBi> lstThietBi;

	public int getMaPhieuBaoTri() {
		return maPhieuBaoTri;
	}

	public void setMaPhieuBaoTri(int maPhieuBaoTri) {
		this.maPhieuBaoTri = maPhieuBaoTri;
	}

	public Date getNgayBaoTri() {
		return ngayBaoTri;
	}

	public void setNgayBaoTri(Date ngayBaoTri) {
		this.ngayBaoTri = ngayBaoTri;
	}

	public String getMaNhanVienChiuTrachNhiem() {
		return maNhanVienChiuTrachNhiem;
	}

	public void setMaNhanVienChiuTrachNhiem(String maNhanVienChiuTrachNhiem) {
		this.maNhanVienChiuTrachNhiem = maNhanVienChiuTrachNhiem;
	}

	public String getNoiBaoTri() {
		return noiBaoTri;
	}

	public void setNoiBaoTri(String noiBaoTri) {
		this.noiBaoTri = noiBaoTri;
	}

	public String getDiaChiBaoTri() {
		return diaChiBaoTri;
	}

	public void setDiaChiBaoTri(String diaChiBaoTri) {
		this.diaChiBaoTri = diaChiBaoTri;
	}

	public float getPhiBaoTri() {
		return phiBaoTri;
	}

	public void setPhiBaoTri(float phiBaoTri) {
		this.phiBaoTri = phiBaoTri;
	}

	public java.util.List<ChiTietThietBi> getLstThietBi() {
		return lstThietBi;
	}

	public void setLstThietBi(java.util.List<ChiTietThietBi> lstThietBi) {
		this.lstThietBi = lstThietBi;
	}

	public BaoTriData(int maPhieuBaoTri, Date ngayBaoTri, String maNhanVienChiuTrachNhiem, String noiBaoTri,
			String diaChiBaoTri, float phiBaoTri, List<ChiTietThietBi> lstThietBi) {
		super();
		this.maPhieuBaoTri = maPhieuBaoTri;
		this.ngayBaoTri = ngayBaoTri;
		this.maNhanVienChiuTrachNhiem = maNhanVienChiuTrachNhiem;
		this.noiBaoTri = noiBaoTri;
		this.diaChiBaoTri = diaChiBaoTri;
		this.phiBaoTri = phiBaoTri;
		this.lstThietBi = lstThietBi;
	}

	public BaoTriData() {
		super();
		// TODO Auto-generated constructor stub
	}

}
