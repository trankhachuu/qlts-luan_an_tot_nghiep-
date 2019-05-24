package tpm.qlts.custommodels;

import java.util.List;

public class BanGiaoData {
	public String kieuBanGiao;
	private String maPhongBanNhan;
	private String maNhanVien;
	private String noiDungBanGiao;
	
	private List<ThietBiChiTiet> lstThietBi;

	public String getKieuBanGiao() {
		return kieuBanGiao;
	}

	public String getNoiDungBanGiao() {
		return noiDungBanGiao;
	}

	public void setNoiDungBanGiao(String noiDungBanGiao) {
		this.noiDungBanGiao = noiDungBanGiao;
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

	public List<ThietBiChiTiet> getLstThietBi() {
		return lstThietBi;
	}

	public void setLstThietBi(List<ThietBiChiTiet> lstThietBi) {
		this.lstThietBi = lstThietBi;
	}

	public BanGiaoData() {
		super();
		// TODO Auto-generated constructor stub
	}

	public BanGiaoData(String kieuBanGiao, String maPhongBanNhan, String maNhanVien, List<ThietBiChiTiet> lstThietBi) {
		super();
		this.kieuBanGiao = kieuBanGiao;
		this.maPhongBanNhan = maPhongBanNhan;
		this.maNhanVien = maNhanVien;
		this.lstThietBi = lstThietBi;
	}

}
