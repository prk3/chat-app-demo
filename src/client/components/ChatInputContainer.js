
import { connect } from 'react-redux'
import ChatInput from './ChatInput.js'

import * as actions from '../state/actions.js'


const mapDispatchToProps = (dispatch, ownProps) => ({
  emitMessage: message => dispatch(actions.emit('message', { content: message })),
})

const ChatInputContainer = connect(
  null,
  mapDispatchToProps,
)(ChatInput)

export default ChatInputContainer


