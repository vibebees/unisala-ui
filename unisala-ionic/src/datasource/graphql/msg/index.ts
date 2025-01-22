import { gql } from "@apollo/client";

export const fetchMessageHistory = gql`
  query GetMessageHistories($userId: ID!, $connectedList: [ID]) {
    getMessageHistories(queryMsg: { userId: $userId, connectedList: $connectedList }) {
      conversationId
      messages {
        _id
        senderId
        receiverId
        text
        image
        video
        seen
        createdAt
      }
    }
  }
`;
