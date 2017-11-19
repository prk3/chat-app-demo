
import React from 'react'


class NotificationBox extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="notification-box">
        {
          this.props.notifications.map(notification =>
            <div
              className={`notification${notification.type ? ' notification--' + notification.type : ''}`}
              key={notification.id}
              >{ notification.content }
            </div>
          )
        }
      </div>
    )
  }
}

export default NotificationBox

