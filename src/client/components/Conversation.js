
import React from 'react'

import ChatMessage from './ChatMessage.js'


class Conversation extends React.Component {

  constructor(props) {
    super(props)

    this.container = null
    this.containerScrolledDown = true

    this.scrollIfNeeded = this.scrollIfNeeded.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }


  scrollIfNeeded(container) {
    if (container && this.containerScrolledDown) {
      container.scrollTop = container.scrollHeight - container.clientHeight
    }
  }


  handleScroll(event) {
    this.containerScrolledDown =
      Math.round(event.target.scrollTop) == event.target.scrollHeight - event.target.clientHeight
  }


  render() {
    return (
      <div
        className="chat__conversation"
        ref={container => this.scrollIfNeeded(container) }
        onScroll={this.handleScroll}
        >
        { this.renderSets(this.props.sets) }
      </div>
    )
  }

  renderSets(sets) {
    return sets.map(set =>
      <div className="chat__conversation__set" key={set.messages[0].id}>
        <div className="chat__conversation__set__author">{set.author}: </div>
        <div className="chat__conversation__set__messages-container">
          { this.renderMessages(set.messages) }
        </div>
      </div>
    )
  }

  renderMessages(messages) {
    return messages.map(msg =>
      <ChatMessage
        className="chat__conversation__set__message"
        content={msg.content}
        key={msg.id}/>
    )
  }
}

export default Conversation

