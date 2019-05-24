package tpm.qlts.comporator;

import java.util.Comparator;

import tpm.qlts.custommodels.NodeInTimeLine;

public class TimeLineConporator implements Comparator<NodeInTimeLine> {

	@Override
	public int compare(NodeInTimeLine node1, NodeInTimeLine node2) {
		int ssTuNgay = node2.getTuNgay().compareTo(node1.getTuNgay());
		if (ssTuNgay == 0) {
			return node2.getTimestame().compareTo(node1.getTimestame());

		}
		return ssTuNgay;
	}

}
