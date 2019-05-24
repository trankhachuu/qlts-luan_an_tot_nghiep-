package tpm.qlts.custommodels;

import java.util.List;

import tpm.qlts.entitys.ThietBi;

public class LoaiTBJonPhongBan {
	private String maLoai;
	private String tenLoai;
	private String maPhongBan;
	private List<ThietBi> lstThietBi;
	
	public String getMaLoai() {
		return maLoai;
	}
	public void setMaLoai(String maLoai) {
		this.maLoai = maLoai;
	}
	public String getTenLoai() {
		return tenLoai;
	}
	public void setTenLoai(String tenLoai) {
		this.tenLoai = tenLoai;
	}
	public String getMaPhongBan() {
		return maPhongBan;
	}
	public void setMaPhongBan(String maPhongBan) {
		this.maPhongBan = maPhongBan;
	}
	public List<ThietBi> getLstThietBi() {
		return lstThietBi;
	}
	public void setLstThietBi(List<ThietBi> lstThietBi) {
		this.lstThietBi = lstThietBi;
	}
	public LoaiTBJonPhongBan(String maLoai, String tenLoai, String maPhongBan, List<ThietBi> lstThietBi) {
		super();
		this.maLoai = maLoai;
		this.tenLoai = tenLoai;
		this.maPhongBan = maPhongBan;
		this.lstThietBi = lstThietBi;
	}
	public LoaiTBJonPhongBan() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
