package tpm.qlts.custommodels;

import java.io.Serializable;
import java.util.List;

public class PhieuYeuCauThietBiUpdate implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private int maPhieu;
	private String mucDich;
	private String nhanVien;
	
	private List<ChiTietYeuCauUpdate> chiTietYeuCaus;
	
	public PhieuYeuCauThietBiUpdate(int maPhieu, String mucDich, String nhanVien,
			List<ChiTietYeuCauUpdate> chiTietYeuCaus) {
		super();
		this.maPhieu = maPhieu;
		this.mucDich = mucDich;
		this.nhanVien = nhanVien;
		this.chiTietYeuCaus = chiTietYeuCaus;
	}

	public String getMucDich() {
		return mucDich;
	}

	public void setMucDich(String mucDich) {
		this.mucDich = mucDich;
	}

	public String getNhanVien() {
		return nhanVien;
	}

	public void setNhanVien(String nhanVien) {
		this.nhanVien = nhanVien;
	}

	public List<ChiTietYeuCauUpdate> getChiTietYeuCaus() {
		return chiTietYeuCaus;
	}

	public void setChiTietYeuCaus(List<ChiTietYeuCauUpdate> chiTietYeuCaus) {
		this.chiTietYeuCaus = chiTietYeuCaus;
	}

	public PhieuYeuCauThietBiUpdate() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getMaPhieu() {
		return maPhieu;
	}

	public void setMaPhieu(int maPhieu) {
		this.maPhieu = maPhieu;
	}

	public PhieuYeuCauThietBiUpdate(int maPhieu) {
		super();
		this.maPhieu = maPhieu;
	}
}
