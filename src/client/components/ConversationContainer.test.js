
import test from 'ava'
import { messagesToSets } from './ConversationContainer.js'


test('messages to sets conversion', t => {

  t.deepEqual(messagesToSets([
    { id: 1,  author: 'tom',    content: 'hello there' },
    { id: 2,  author: 'alice',  content: 'key' },
    { id: 3,  author: 'alice',  content: 'key' },
    { id: 4,  author: 'tom',    content: 'nice to see you' },
    { id: 5,  author: 'emily',  content: 'i like turtles' },
    { id: 6,  author: 'emily',  content: 'and flowers' },
    { id: 7,  author: 'emily', content: 'and music', }
  ]), [
    { author: 'tom', messages: [
      { id: 1,  author: 'tom',    content: 'hello there' },
    ]},
    { author: 'alice', messages: [
      { id: 2,  author: 'alice',  content: 'key' },
      { id: 3,  author: 'alice',  content: 'key' },
    ]},
    { author: 'tom', messages: [
      { id: 4,  author: 'tom',    content: 'nice to see you' },
    ]},
    { author: 'emily', messages: [
      { id: 5,  author: 'emily',  content: 'i like turtles' },
      { id: 6,  author: 'emily',  content: 'and flowers' },
      { id: 7,  author: 'emily', content: 'and music', }
    ]}
  ])
})
