package tpm.qlts.comporator;

import java.util.Comparator;

import tpm.qlts.entitys.Notifications;

public class NotificationComporator implements Comparator<Notifications> {

	@Override
	public int compare(Notifications arg0, Notifications arg1) {
		if (arg1.getNotificationID() > arg0.getNotificationID())
			return 1;
		else if (arg1.getNotificationID() == arg0.getNotificationID())
			return 0;
		else
			return -1;
	}

}
