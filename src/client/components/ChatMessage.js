
import React from 'react'

class ChatMessage extends React.Component {

  constructor(props) {
    super(props)
  }

  // message content is escaped on the server
  render() {
    return (
      <div className="chat__message">
        <div className="chat__message__content" dangerouslySetInnerHTML={{ __html: this.props.content }}></div>
      </div>
    )
  }
}

export default ChatMessage

