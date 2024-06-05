import { useMutation } from '@apollo/client';
 
export const useSendConnectRequest = ({SendConnectRequest, present, dismiss, USER_SERVICE_GQL, setRequestSent}) => {
  const [sendConnectRequest] = useMutation(SendConnectRequest, {
    onCompleted: (data) => {
      if (data.sendConnectRequest && data.sendConnectRequest.success) {
        present({
          duration: 3000,
          message: "Connect request sent",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "success",
          mode: "ios",
        });
        setRequestSent(true);
      }
    },
    onError: (error) => {
      dismiss();
      present({
        duration: 3000,
        message: `Error sending connect request: ${error.message}`,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    },
    context: { server: USER_SERVICE_GQL },
  });

  return [sendConnectRequest];
};

export const useAcceptConnectRequest = ({AcceptConnectRequest, present,getUserGql, dismiss, USER_SERVICE_GQL, setRequestAccepted, user, profileBelongsTo}) => {
  const [acceptConnectRequest] = useMutation(AcceptConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: { acceptConnectRequest } }) => {
        if (!user || !user.username) {
            console.error('User or username is undefined:', user);
          }
          
          console.log(acceptConnectRequest)


      const getUser = cache.readQuery({
        query: getUserGql,
        variables: { username: profileBelongsTo },
      });
      if (getUser) {
        cache.writeQuery({
          query: getUserGql,
          variables: { username: user?.username },
          data: {
            getUser: {
              ...getUser.getUser,
              connectionType: {
                ...getUser.getUser.connectionType,
                status: "accepted",
              },
            },
          },
        });
      }
    },
    onCompleted: (data) => {
      if (data.acceptConnectRequest && data.acceptConnectRequest.success) {
        present({
          duration: 3000,
          message: "Connect request accepted. You can now send messages.",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "success",
          mode: "ios",
        });
        setRequestAccepted(true);
      }
    },
    onError: (error) => {
      dismiss();
      present({
        duration: 3000,
        message: `Error accepting connect request: ${error.message}`,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    },
  });

  return [acceptConnectRequest];
};
