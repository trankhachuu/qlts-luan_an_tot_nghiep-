package tpm.qlts.comporator;

import java.util.Comparator;

import tpm.qlts.entitys.PhieuBaoTri;

public class PhieuBaoTriComporator implements Comparator<PhieuBaoTri> {

	@Override
	public int compare(PhieuBaoTri o1, PhieuBaoTri o2) {
		return o1.getMaPhieuBaoTri() < o2.getMaPhieuBaoTri() ? 1 : -1;
	}

}
