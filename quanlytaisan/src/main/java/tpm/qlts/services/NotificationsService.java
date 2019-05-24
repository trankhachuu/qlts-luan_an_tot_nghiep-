package tpm.qlts.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.Notifications;
import tpm.qlts.repositorys.NotificationsRepository;

@Service("NotificationsService")
public class NotificationsService {
	@Autowired
	private NotificationsRepository notificationsRepository;

	public List<Notifications> findAll() {
		return (List<Notifications>) notificationsRepository.findAll();
	}

	public Notifications save(Notifications noti) {
		return notificationsRepository.save(noti);
	}
}
