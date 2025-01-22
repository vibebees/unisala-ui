const UserId = Array<string>;

export const generateConvesationId = (usersInConversation: typeof UserId) => {
    const ids = usersInConversation?.sort();
    return `${ids[0]}-${ids[1]}`;
};

