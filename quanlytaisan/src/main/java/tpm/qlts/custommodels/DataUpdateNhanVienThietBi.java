package tpm.qlts.custommodels;

import java.util.List;

public class DataUpdateNhanVienThietBi {
	public String kieuBanGiao;
	private String maPhongBanNhan;
	private String maNhanVien;
	private String noiDungBanGiao;

	List<Long> lstThietBi;

	public String getKieuBanGiao() {
		return kieuBanGiao;
	}

	public void setKieuBanGiao(String kieuBanGiao) {
		this.kieuBanGiao = kieuBanGiao;
	}

	public String getMaPhongBanNhan() {
		return maPhongBanNhan;
	}

	public void setMaPhongBanNhan(String maPhongBanNhan) {
		this.maPhongBanNhan = maPhongBanNhan;
	}

	public String getMaNhanVien() {
		return maNhanVien;
	}

	public void setMaNhanVien(String maNhanVien) {
		this.maNhanVien = maNhanVien;
	}

	public String getNoiDungBanGiao() {
		return noiDungBanGiao;
	}

	public void setNoiDungBanGiao(String noiDungBanGiao) {
		this.noiDungBanGiao = noiDungBanGiao;
	}

	public List<Long> getLstThietBi() {
		return lstThietBi;
	}

	public void setLstThietBi(List<Long> lstThietBi) {
		this.lstThietBi = lstThietBi;
	}

	public DataUpdateNhanVienThietBi(String kieuBanGiao, String maPhongBanNhan, String maNhanVien,
			String noiDungBanGiao, List<Long> lstThietBi) {
		super();
		this.kieuBanGiao = kieuBanGiao;
		this.maPhongBanNhan = maPhongBanNhan;
		this.maNhanVien = maNhanVien;
		this.noiDungBanGiao = noiDungBanGiao;
		this.lstThietBi = lstThietBi;
	}

	public DataUpdateNhanVienThietBi() {
		super();
		// TODO Auto-generated constructor stub
	}

}
