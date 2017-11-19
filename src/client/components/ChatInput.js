
import React from 'react'


class ChatInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
    this.textarea = null

    this.handleContentChange = this.handleContentChange.bind(this)
    this.send = this.send.bind(this)
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value })
  }

  send() {
    this.props.emitMessage(this.state.content)
    this.setState({ content: '' })
    this.textarea.focus()
  }

  render() {
    return (
      <div className="chat-input-bar">
        <div className="chat-input-bar__textarea-wrap">
          <textarea
            className="chat-input-bar__textarea"
            autoFocus
            ref={textarea => this.textarea = textarea}
            value={this.state.content}
            onChange={this.handleContentChange}>
          </textarea>
        </div>

        <button
          className="chat-input-bar__send-button"
          disabled={this.state.content.trim() == ''}
          onClick={this.send}>

          Send
        </button>
      </div>
    )
  }
}

export default ChatInput

