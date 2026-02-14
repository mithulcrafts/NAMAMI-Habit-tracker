export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  try {
    const result = await Notification.requestPermission()
    return result === 'granted'
  } catch (error) {
    console.error('Error requesting notification permission:', error)
    return false
  }
}

export const sendNotification = async (title, body, isEnabled = true) => {
  // Check if notifications are enabled in app settings
  if (!isEnabled) return false
  
  if (!('Notification' in window)) {
    console.warn('Web Notifications API not supported')
    return false
  }
  
  try {
    // Check permission after checking if enabled
    if (Notification.permission === 'denied') {
      console.warn('Notification permission denied by user')
      return false
    }
    
    const granted = await requestNotificationPermission()
    if (!granted) {
      console.warn('User did not grant notification permission')
      return false
    }
    
    // Slight delay to avoid blocking UI
    setTimeout(() => {
      try {
        new Notification(title, { body })
      } catch (error) {
        console.error('Error sending notification:', error)
      }
    }, 200)
    return true
  } catch (error) {
    console.error('Error in sendNotification:', error)
    return false
  }
}
