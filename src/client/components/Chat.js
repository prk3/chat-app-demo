
import React from 'react'

import NameDialogContainer from './NameDialogContainer.js'
import ChatInputContainer from './ChatInputContainer.js'
import ConversationContainer from './ConversationContainer.js'
import NotificationBox from './NotificationBox.js'


class Chat extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    if (! this.props.connected)
      return <NameDialogContainer/>
    else
      return (
        <div className="chat">
          <NotificationBox notifications={this.props.notifications}/>
          <ConversationContainer/>
          <ChatInputContainer/>
        </div>
      )
  }
}

export default Chat

