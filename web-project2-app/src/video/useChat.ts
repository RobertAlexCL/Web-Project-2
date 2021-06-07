import { useState, useEffect } from 'react'
import { getSession } from './VideoIntegration'

const useSession = () => {
  const session = getSession()
  const [messages, setMessages] = useState<any>([])
  //const messages = []

  useEffect(() => {
    console.log(messages)
    if (session) {

      session.on('signal:msg', function (event: any) {
        setMessages(
          (oldMessages: any) =>
            [
              ...oldMessages,
              {
                message: event.data,
                from: session.connection.connectionId ? 'mine' : 'theirs',
              }
            ])

      })
    }
    return (
      () => console.log('Cleaning')
    )
  }, [session])
  return {
    messages,
  }
}
export default useSession
