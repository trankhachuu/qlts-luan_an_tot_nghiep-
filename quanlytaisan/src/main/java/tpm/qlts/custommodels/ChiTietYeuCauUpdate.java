package tpm.qlts.custommodels;

public class ChiTietYeuCauUpdate {
	private String tenThietBi;
	private String quyCach_DatTinh;
	private int soLuong;
	private int donViTInh;
	
	public ChiTietYeuCauUpdate(String tenThietBi, String quyCach_DatTinh, int soLuong, int donViTInh) {
		super();
		this.tenThietBi = tenThietBi;
		this.quyCach_DatTinh = quyCach_DatTinh;
		this.soLuong = soLuong;
		this.donViTInh = donViTInh;
	}

	public String getTenThietBi() {
		return tenThietBi;
	}

	public void setTenThietBi(String tenThietBi) {
		this.tenThietBi = tenThietBi;
	}

	public String getQuyCach_DatTinh() {
		return quyCach_DatTinh;
	}

	public void setQuyCach_DatTinh(String quyCach_DatTinh) {
		this.quyCach_DatTinh = quyCach_DatTinh;
	}

	public int getSoLuong() {
		return soLuong;
	}

	public void setSoLuong(int soLuong) {
		this.soLuong = soLuong;
	}

	public int getDonViTInh() {
		return donViTInh;
	}

	public void setDonViTInh(int donViTInh) {
		this.donViTInh = donViTInh;
	}

	public ChiTietYeuCauUpdate() {
		super();
		// TODO Auto-generated constructor stub
	} 
	
}
