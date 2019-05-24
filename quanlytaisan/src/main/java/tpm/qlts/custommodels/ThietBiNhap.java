package tpm.qlts.custommodels;

import java.util.List;

public class ThietBiNhap {
	private String tenThietBi;
	private String maLoaiThietBi;
	private String maNhomThietBi;
	private String kieuNhap;
	private String maLoaiCha;
	private int maDonViTinh;
	private int soLuong;
	private float dongia;
	private int baoHanh;
	private float khauHao;
	private List<Long> lstMaThietBi;

	public ThietBiNhap() {
	}

	public ThietBiNhap(String tenThietBi, String maLoaiThietBi, String maNhomThietBi, String kieuNhap, String maLoaiCha,
			int maDonViTinh, int soLuong, float dongia, int baoHanh, float khauHao, List<Long> lstMaThietBi) {
		super();
		this.tenThietBi = tenThietBi;
		this.maLoaiThietBi = maLoaiThietBi;
		this.maNhomThietBi = maNhomThietBi;
		this.kieuNhap = kieuNhap;
		this.maLoaiCha = maLoaiCha;
		this.maDonViTinh = maDonViTinh;
		this.soLuong = soLuong;
		this.dongia = dongia;
		this.baoHanh = baoHanh;
		this.khauHao = khauHao;
		this.lstMaThietBi = lstMaThietBi;
	}

	public String getMaNhomThietBi() {
		return maNhomThietBi;
	}

	public void setMaNhomThietBi(String maNhomThietBi) {
		this.maNhomThietBi = maNhomThietBi;
	}

	public String getKieuNhap() {
		return kieuNhap;
	}

	public void setKieuNhap(String kieuNhap) {
		this.kieuNhap = kieuNhap;
	}

	public String getMaLoaiCha() {
		return maLoaiCha;
	}

	public void setMaLoaiCha(String maLoaiCha) {
		this.maLoaiCha = maLoaiCha;
	}

	public float getDongia() {
		return dongia;
	}

	public void setDongia(float dongia) {
		this.dongia = dongia;
	}

	public String getTenThietBi() {
		return tenThietBi;
	}

	public void setTenThietBi(String tenThietBi) {
		this.tenThietBi = tenThietBi;
	}

	public String getMaLoaiThietBi() {
		return maLoaiThietBi;
	}

	public void setMaLoaiThietBi(String maLoaiThietBi) {
		this.maLoaiThietBi = maLoaiThietBi;
	}

	public int getMaDonViTinh() {
		return maDonViTinh;
	}

	public void setMaDonViTinh(int maDonViTinh) {
		this.maDonViTinh = maDonViTinh;
	}

	public int getSoLuong() {
		return soLuong;
	}

	public void setSoLuong(int soLuong) {
		this.soLuong = soLuong;
	}

	public float getDonGia() {
		return dongia;
	}

	public void setDonGia(float donGia) {
		this.dongia = donGia;
	}

	public int getBaoHanh() {
		return baoHanh;
	}

	public void setBaoHanh(int baoHanh) {
		this.baoHanh = baoHanh;
	}

	public float getKhauHao() {
		return khauHao;
	}

	public void setKhauHao(float khauHao) {
		this.khauHao = khauHao;
	}

	public List<Long> getLstMaThietBi() {
		return lstMaThietBi;
	}

	public void setLstMaThietBi(List<Long> lstMaThietBi) {
		this.lstMaThietBi = lstMaThietBi;
	}

}
