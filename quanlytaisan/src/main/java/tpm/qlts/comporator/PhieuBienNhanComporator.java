package tpm.qlts.comporator;

import java.util.Comparator;

import tpm.qlts.entitys.BienNhanThietBi;

public class PhieuBienNhanComporator implements Comparator<BienNhanThietBi>{

	@Override
	public int compare(BienNhanThietBi o1, BienNhanThietBi o2) {
		return o2.getMaBienNhan().compareTo(o1.getMaBienNhan());
	}
}
