
import test from 'ava'
import MessageController from './MessageController.js'

const process = MessageController.processMessageContent


test('messages without links', t => {

  t.is(
    process('Super message. No links.'),
    'Super message. No links.'
  )

  t.is(
    process('You should visit funnymemes.com'),
    'You should visit funnymemes.com'
  )

  t.is(
    process('ble ble my@email.yo'),
    'ble ble my@email.yo'
  )

  t.is(
    process('escape <>&"\''),
    'escape &lt;&gt;&amp;&quot;&#39;'
  )

  t.is(
    process('xss test <script></script> or <img src="">'),
    'xss test &lt;script&gt;&lt;/script&gt; or &lt;img src=&quot;&quot;&gt;'
  )
})


test('messages with one link', t => {

  t.is(
    process('hey tom. http://youtube.com/watch?v=123qweasdzxc'),
    'hey tom. <a href="http://youtube.com/watch?v=123qweasdzxc">http://youtube.com/watch?v=123qweasdzxc</a>'
  )

  t.is(
    process('https://github.com/'),
    '<a href="https://github.com/">https://github.com/</a>'
  )

  t.is(
    process('dot at the end http://hello.com/nice/.'),
    'dot at the end <a href="http://hello.com/nice/">http://hello.com/nice/</a>.'
  )

  t.is(
    process('xss and link <img/> http://hello.world/a?x=1&y=2'),
    'xss and link &lt;img/&gt; <a href="http://hello.world/a?x=1&y=2">http://hello.world/a?x=1&amp;y=2</a>'
  )
})


test('many links', t => {

  t.is(
    process('one http://one.two.uk two <br/> https://ble.com/super three'),
    'one <a href="http://one.two.uk">http://one.two.uk</a> two &lt;br/&gt; <a href="https://ble.com/super">https://ble.com/super</a> three'
  )
})

