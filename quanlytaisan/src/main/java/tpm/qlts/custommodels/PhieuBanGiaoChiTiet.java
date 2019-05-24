package tpm.qlts.custommodels;

public class PhieuBanGiaoChiTiet {
	private String maBanGiao;
	private String ngayBanGiao;
	private String noiDungBanGiao;
	private String nguoiBanGiao;
	private String tenNguoiBanGiao;

	public String getMaBanGiao() {
		return maBanGiao;
	}

	public void setMaBanGiao(String maBanGiao) {
		this.maBanGiao = maBanGiao;
	}

	public String getNgayBanGiao() {
		return ngayBanGiao;
	}

	public void setNgayBanGiao(String ngayBanGiao) {
		this.ngayBanGiao = ngayBanGiao;
	}

	public String getNoiDungBanGiao() {
		return noiDungBanGiao;
	}

	public void setNoiDungBanGiao(String noiDungBanGiao) {
		this.noiDungBanGiao = noiDungBanGiao;
	}

	public String getNguoiBanGiao() {
		return nguoiBanGiao;
	}

	public void setNguoiBanGiao(String nguoiBanGiao) {
		this.nguoiBanGiao = nguoiBanGiao;
	}

	public String getTenNguoiBanGiao() {
		return tenNguoiBanGiao;
	}

	public void setTenNguoiBanGiao(String tenNguoiBanGiao) {
		this.tenNguoiBanGiao = tenNguoiBanGiao;
	}

	public PhieuBanGiaoChiTiet(String maBanGiao, String ngayBanGiao, String noiDungBanGiao, String nguoiBanGiao,
			String tenNguoiBanGiao) {
		super();
		this.maBanGiao = maBanGiao;
		this.ngayBanGiao = ngayBanGiao;
		this.noiDungBanGiao = noiDungBanGiao;
		this.nguoiBanGiao = nguoiBanGiao;
		this.tenNguoiBanGiao = tenNguoiBanGiao;
	}

	public PhieuBanGiaoChiTiet() {
		super();
		// TODO Auto-generated constructor stub
	}

}
