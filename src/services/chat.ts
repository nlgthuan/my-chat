import { db } from '@/db';

const sendChatMessage = async (newMessage: string, conversationID: string) => {
  // Get conversation's messages
  const conversation = await db.conversations.get(conversationID);

  if(!conversation) {
      throw new Error('Conversation not found');
  }


  // Get conversation model
  //
  // Call the correct services
  //
  // Return the response
  // but what's the type of the response
  // how to stream it
  // how to display it
  // how to update the database
  //
  //
  // Update database
};

export { sendChatMessage };
