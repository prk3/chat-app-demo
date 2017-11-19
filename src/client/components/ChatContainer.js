
import React from 'react'
import { connect } from 'react-redux'

import Chat from './Chat.js'


const mapStateToProps = (state, ownProps) => ({
  connected: state.connected,
  notifications: state.notifications,
})

const ChatContainer = connect(
  mapStateToProps,
  null,
)(Chat)

export default ChatContainer


