
import { connect } from 'react-redux'

import Conversation from './Conversation.js'
import * as actions from '../state/actions.js'


export function messagesToSets(messages) {

  const sets = []

  messages.forEach((message, index) => {
    if (index != 0 && messages[index-1].author == message.author)
      sets[sets.length-1].messages.push(message)
    else
      sets.push({
        author: message.author,
        messages: [message],
      })
  })

  return sets
}

const mapStateToProps = (state, ownProps) => ({
  sets: messagesToSets(state.messages),
})

const ConversationContainer = connect(
  mapStateToProps,
  null,
)(Conversation)

export default ConversationContainer
