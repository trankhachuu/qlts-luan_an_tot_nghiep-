package tpm.qlts.comporator;

import java.util.Comparator;

import tpm.qlts.custommodels.PhieuBanGiaoChiTiet;

public class PhieuLuanChuyenComparator implements Comparator<PhieuBanGiaoChiTiet> {

	@Override
	public int compare(PhieuBanGiaoChiTiet arg0, PhieuBanGiaoChiTiet arg1) {
		return arg1.getMaBanGiao().compareTo(arg0.getMaBanGiao());
	}

}
