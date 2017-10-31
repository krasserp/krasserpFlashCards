import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { FLASH_ACTIVITY_KEY } from './constants'



export function clearLocalNotification () {
  return AsyncStorage.removeItem(FLASH_ACTIVITY_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}


export function createLocalNotification(){
    return {
        title :'Deck reminder',
        body: '🖐 Have you done your deck routine today?',
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}


export function setLocalNotification () {
  AsyncStorage.getItem(FLASH_ACTIVITY_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate()+1)  // +1
              tomorrow.setHours(8)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createLocalNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(FLASH_ACTIVITY_KEY, JSON.stringify(true))
            }
          })
      }
    })
}