package tpm.qlts.repositorys;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.Notifications;


@Repository("notificationsRepository")
public interface NotificationsRepository extends CrudRepository<Notifications, Integer>{
	
}
