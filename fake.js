(GetInterviewExperience = gql`
  query getInterviewExperience($unitId: Float!, $page: Int, $pageSize: Int) {
    getInterviewExperience(unitId: $unitId, page: $page, pageSize: $pageSize) {
      status {
        success
        message
      }
      interviewExperience {
        unitId
        applied_level
        status
        attempt
        university
        conversation
        major
      }
    }
  }
`),
  (GetSpaceCategory = gql`
    query searchSpaceCategory($q: String!, $count: Int) {
      searchSpaceCategory(q: $q, count: $count) {
        status {
          message
          success
        }
        data {
          _id
          name
          parentId
          description
          image
          role
          isJoined
          user {
            username
            _id
          }
        }
      }
    }
  `),
  (GetOrgSpace = gql`
    query getOrgSpaceById($id: ID, $name: String) {
      getOrgSpaceById(id: $id, name: $name) {
        status {
          success
          message
        }
        data {
          name
          _id
          name
          description
          profileImage
          coverImage
          image
          admin {
            _id
            firstName
            lastName
            picture
            username
          }
          role
          isJoined
        }
      }
    }
  `),
  (GetAllPostByOrgSpaceID = gql`
    query getAllPostByOrgSpaceId($id: ID!, $pageSize: Int, $page: Int) {
      getAllPostByOrgSpaceId(id: $id, pageSize: $pageSize, page: $page) {
        status {
          success
          message
        }
        data {
          _id
          uniId
          images
          postText
          postImage
          date
          upVoteCount
          postCommentsCount
          upVoted
          saved
          videoURL
          type
          user {
            _id
            username
            firstName
            lastName
            picture
            username
          }
        }
      }
    }
  `),
  (GetAllPostBySpaceCategoryID = gql`
    query getAllPostBySpaceCategoryID($id: ID, $limit: Int, $page: Int) {
      getAllPostBySpaceCategoryID(id: $id, limit: $limit, page: $page) {
        status {
          success
          message
        }
        posts {
          _id
          images
          postText
          postImage
          date
          upVoteCount
          postCommentsCount
          upVoted
          saved
          videoURL
          user {
            _id
            username
            firstName
            lastName
            picture
            username
          }
        }
      }
    }
  `),
  (GetAllEventsBySpaceID = gql`
    query getAllEventBySpaceId($spaceId: ID!) {
      getAllEventBySpaceId(spaceId: $spaceId) {
        status {
          success
          message
        }
        data {
          _id
          title
          description
          address
          eventDate
          interestedUsers {
            user {
              _id
              firstName
              lastName
              username
              picture
            }
            date
          }
          isRegistered
        }
      }
    }
  `),
  (GetTopActiveSpaces = gql`
    query getTopActiveSpaces($limit: Int) {
      getTopActiveSpaces(limit: $limit) {
        status {
          success
          message
        }
        spaceCategory {
          _id
          name
          parentId
        }
      }
    }
  `),
  (CreateOrgSpace = gql`
    mutation createOrgSpace($name: String!, $description: String) {
      createOrgSpace(name: $name, description: $description) {
        status {
          success
          message
        }
        data {
          name
          description
          profileImage
          _id
        }
      }
    }
  `),
  (GetTopOrgs = gql`
    query {
      getTopOrgSpace {
        status {
          success
          message
        }
        data {
          _id
          name
          description
          profileImage
          coverImage
          admin {
            _id
            firstName
            lastName
          }
          members {
            firstName
            lastName
            _id
            username
          }
          students {
            _id
            firstName
            lastName
            username
          }
        }
      }
    }
  `),
  (AddSpaceCategory = gql`
    mutation addSpaceCategory(
      $name: String!
      $description: String
      $isOrgSpace: Boolean
    ) {
      addSpaceCategory(
        name: $name
        description: $description
        isOrgSpace: $isOrgSpace
      ) {
        status {
          success
          message
        }
        spaceCategory {
          _id
          name
        }
      }
    }
  `),
  (AddSpaceEvent = gql`
    mutation AddSpaceEvent(
      $spaceId: ID!
      $title: String!
      $description: String!
      $address: String!
      $eventDate: String!
    ) {
      addOrgSpaceEvent(
        spaceId: $spaceId
        title: $title
        description: $description
        address: $address
        eventDate: $eventDate
      ) {
        status {
          success
          message
        }
        data {
          _id
          userId
          orgId
          spaceId
          title
          description
          address
          eventDate
        }
      }
    }
  `),
  (GetSpaceEvents = gql`
    query GetllEvent($spaceId: ID!) {
      getAllEventBySpaceId(spaceId: $spaceId) {
        status {
          success
          message
        }
        data {
          _id
          title
          eventDate
          description
          images
          isRegistered
          user {
            _id
            firstName
            lastName
          }
          spaceOrg {
            _id
            name
            description
            profileImage
            members {
              _id
              firstName
              lastName
            }
          }
        }
      }
    }
  `),
  (DeleteSpace = gql`
    mutation deleteSpaceCategoryById($id: ID!) {
      deleteSpaceCategoryById(id: $id) {
        success
        message
      }
    }
  `),
  (GetAllQuestions = gql`
    query {
      getAllQuestions {
        status {
          success
          message
        }
        questions {
          text
          type
          options {
            key
            value
          }
          category
          description
          qnsNumber
          nextQuestion
        }
      }
    }
  `),
  (GetAllMembersBySpaceID = gql`
    query getAllMemberBySpaceId($spaceId: ID!) {
      getAllMemberBySpaceId(spaceId: $spaceId) {
        status {
          success
          message
        }
        data {
          members {
            _id
            firstName
            lastName
            username
            picture
          }
          alumini {
            _id
            firstName
            lastName
            username
            picture
          }
          students {
            _id
            firstName
            lastName
            username
            picture
          }
        }
      }
    }
  `),
  (EditSpace = gql`
    mutation editSpaceCategoryById(
      $id: ID!
      $name: String
      $image: String
      $description: String
    ) {
      editSpaceCategoryById(
        id: $id
        name: $name
        image: $image
        description: $description
      ) {
        status {
          message
          success
        }
        spaceCategory {
          _id
          name
          parentId
          image
          description
          user {
            _id
          }
        }
      }
    }
  `),
  (GetOwnSpace = gql`
    query GetOwnSpace($limit: Int, $page: Int, $isActive: Boolean) {
      getOwnSpaceCategory(limit: $limit, page: $page, isActive: $isActive) {
        status {
          message
          success
        }
        spaceCategory {
          _id
          name
          user {
            username
            _id
          }
        }
      }
    }
  `),
  (GenerateSpaceNewsFeed = gql`
    query GenerateSpaceNewsFeed($limit: Int, $page: Int) {
      generateSpaceNewsFeedSystem(limit: $limit, page: $page) {
        status {
          message
          success
        }
        posts {
          _id
          postImage
          postText
          date
          upVoteCount
          postCommentsCount
          upVoted
          user {
            _id
            username
            firstName
            lastName
            picture
          }
          saved
          tags {
            _id
            name
          }
        }
      }
    }
  `),
  (GetUserRoadMapSummary = gql`
    query getUserRoadMapSummary($userId: String!) {
      getUserRoadMapSummary(userId: $userId) {
        status {
          success
          message
        }
        data {
          _id
          summary
          date
          user {
            _id
            firstName
            lastName
          }
        }
      }
    }
  `),
  (fetchFamousUniversities = gql`
    query getFamousUniversity {
      getFamousUniversity {
        unitId
        name
        pictures
      }
    }
  `),
  (RegisterUserEvent = gql`
    mutation registeredUserByEventId(
      $eventId: ID!
      $userId: ID!
      $type: String
    ) {
      registeredUserByEventId(eventId: $eventId, userId: $userId, type: $type) {
        status {
          success
          message
        }
      }
    }
  `),
  (DeleteEventById = gql`
    mutation deleteEventById($eventId: ID!) {
      deleteEventById(eventId: $eventId) {
        status {
          success
          message
        }
      }
    }
  `),
  (GetAllHistoryYear = gql`
    query GetAllHistoryYear($orgId: ID!) {
      getAllHistoryYear(orgId: $orgId) {
        status {
          success
          message
        }
        data
      }
    }
  `),
  (GetAllHistory = gql`
    query GetAllHistory($orgId: ID!, $year: Int) {
      getAllHistory(orgId: $orgId, year: $year) {
        status {
          success
          message
        }
        data {
          _id
          title
          description
          date
        }
      }
    }
  `),
  (AddNewHistory = gql`
    mutation createHistory(
      $orgId: ID!
      $title: String!
      $description: String!
      $date: String!
    ) {
      createHistory(
        orgId: $orgId
        title: $title
        description: $description
        date: $date
      ) {
        status {
          success
          message
        }
        data {
          _id
          userId
          title
          description
          date
        }
      }
    }
  `),
  (InvitationRequestHandler = gql`
    query requestToJoinOrg($orgId: ID!, $status: String!, $email: String!) {
      requestToJoinOrg(orgId: $orgId, status: $status, email: $email) {
        data
      }
    }
  `),
  (Search = gql`
    query Search($q: String!) {
      search(q: $q) {
        totalItems
        items {
          name
          type
          username
        }
        spaces {
          name
          description
        }
        users {
          firstName
          lastName
          username
          oneLinerBio
          picture
        }
        orgs {
          name
          description
        }
      }
    }
  `),
  (GetAllHistoryEvents = gql`
    query getAllHistoryActivity(
      $orgHistoryId: ID!
      $startYear: Int
      $endYear: Int
    ) {
      getAllHistoryActivity(
        orgHistoryId: $orgHistoryId
        startYear: $startYear
        endYear: $endYear
      ) {
        status {
          success
          message
        }
        data {
          _id
          title
          user {
            _id
            firstName
            lastName
            username
            picture
          }
        }
      }
    }
  `),
  (EditHistory = gql`
    mutation editHistory(
      $orgHistoryId: ID!
      $title: String
      $description: String
      $date: String
    ) {
      editHistory(
        orgHistoryId: $orgHistoryId
        title: $title
        description: $description
        date: $date
      ) {
        status {
          success
          message
        }
        data {
          _id
          userId
          orgId
          title
          description
          date
        }
      }
    }
  `);
