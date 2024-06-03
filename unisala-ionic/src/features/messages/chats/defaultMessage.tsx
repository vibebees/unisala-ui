import { Card, CardContent } from "@components/defaults";

export const DefaultChatMessage = ({messageImg}) => (
    <Card className='chats-wrapper'>
      <CardContent className='chats-wrapper__content chats-title'>
        <img src={messageImg} alt='Start Chatting' />
        <h2>Chat with your connections!</h2>
        <p>Start chatting</p>
      </CardContent>
    </Card>
  );