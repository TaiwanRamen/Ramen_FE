import {useState, createContext, useMemo, PropsWithChildren, useContext} from 'react';
import {UserContext} from "./UserContext";

export type NotificationContent = {
    notificationCount?: number | null,
    setNotificationCount: (count:number) => void
}

export const NotificationContext = createContext<NotificationContent>({
    notificationCount: null,
    setNotificationCount: () => {}
});

export const NotificationProvider = (props:PropsWithChildren<any>) => {

    const {user} = useContext(UserContext);

    const [notificationCount, setNotificationCount] = useState<number | null | undefined>(user?.notifications.length);

    //const [user, setUser] = useState<IUser>();
    const providerUser = useMemo(() => ({ notificationCount, setNotificationCount }), [notificationCount, setNotificationCount]);

    return (
        <NotificationContext.Provider value={providerUser}>
            {props.children}
        </NotificationContext.Provider>
    );
};