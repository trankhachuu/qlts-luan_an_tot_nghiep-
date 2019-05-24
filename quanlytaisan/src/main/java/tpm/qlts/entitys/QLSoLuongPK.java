package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the QLSoLuong database table.
 * 
 */
@Embeddable
public class QLSoLuongPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="MaLoai")
	private String maLoai;

	@Column(name="MaTinhTrang")
	private String maTinhTrang;

	public QLSoLuongPK() {
	}
	public String getMaLoai() {
		return this.maLoai;
	}
	public void setMaLoai(String maLoai) {
		this.maLoai = maLoai;
	}
	public String getMaTinhTrang() {
		return this.maTinhTrang;
	}
	public void setMaTinhTrang(String maTinhTrang) {
		this.maTinhTrang = maTinhTrang;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof QLSoLuongPK)) {
			return false;
		}
		QLSoLuongPK castOther = (QLSoLuongPK)other;
		return 
			this.maLoai.equals(castOther.maLoai)
			&& this.maTinhTrang.equals(castOther.maTinhTrang);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.maLoai.hashCode();
		hash = hash * prime + this.maTinhTrang.hashCode();
		
		return hash;
	}
}