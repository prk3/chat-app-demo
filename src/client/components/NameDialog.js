
import React from 'react'


class NameDialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.connect = this.connect.bind(this)
  }

  handleNameChange(event) {
    event.preventDefault()
    this.setState({ name: event.target.value })
  }

  connect() {
    this.props.connectToServer(this.state.name.trim())
  }

  render() {
    return (
      <div className="name-dialog">
        <div>
          <input
            className="name-dialog__name-input"
            placeholder="nick"
            autoFocus
            value={this.state.name}
            onChange={this.handleNameChange}/>

          <button
            className="name-dialog__join-button"
            onClick={this.connect}
            disabled={this.state.name.trim() == ''}>
            Join
          </button>
        </div>
        <p className="name-dialog__connection-error">{this.props.connectionError}</p>
      </div>
    )
  }
}

export default NameDialog

