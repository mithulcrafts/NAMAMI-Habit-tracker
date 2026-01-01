export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export const sendNotification = async (title, body) => {
  const granted = await requestNotificationPermission()
  if (!granted) return false
  // Slight delay to avoid blocking UI
  setTimeout(() => new Notification(title, { body }), 200)
  return true
}
