package tpm.qlts.custommodels;

import java.util.List;

public class ThietBiByLoaiTB {
	private String maLoaiTB;
	private String tenLoaiThietBi;
	private List<ThietBiChiTiet> lstThietBi;

	public ThietBiByLoaiTB(String maLoaiTB, String tenLoaiThietBi, List<ThietBiChiTiet> lstThietBi) {
		super();
		this.maLoaiTB = maLoaiTB;
		this.tenLoaiThietBi = tenLoaiThietBi;
		this.lstThietBi = lstThietBi;
	}

	public ThietBiByLoaiTB() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getMaLoaiTB() {
		return maLoaiTB;
	}

	public void setMaLoaiTB(String maLoaiTB) {
		this.maLoaiTB = maLoaiTB;
	}

	public String getTenLoaiThietBi() {
		return tenLoaiThietBi;
	}

	public void setTenLoaiThietBi(String tenLoaiThietBi) {
		this.tenLoaiThietBi = tenLoaiThietBi;
	}

	public List<ThietBiChiTiet> getLstThietBi() {
		return lstThietBi;
	}

	public void setLstThietBi(List<ThietBiChiTiet> lstThietBi) {
		this.lstThietBi = lstThietBi;
	}

	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		ThietBiByLoaiTB objCast = (ThietBiByLoaiTB) obj;
		return this.maLoaiTB.equals(objCast.getMaLoaiTB());
	}

	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return super.hashCode();
	}

}
