import {useSelector} from "react-redux";
import {INotification} from "../../network/data/INotifications";
import {notificationsSelector} from "../../store/user/selectors";

export function useReadNotifications() {
    const notifications = useSelector(notificationsSelector);
    let isNewNotificationExist = false

    if (!notifications.isWelcomeRead) {
        isNewNotificationExist = true
    } else {
        notifications.results.forEach((notification: INotification) => {
            if (!notification.isRead) {
                isNewNotificationExist = true
                return
            }
        })
    }
    return isNewNotificationExist
}


