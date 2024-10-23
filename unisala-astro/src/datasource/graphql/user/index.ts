import { gql } from "@apollo/client";

export const checkEmail = gql`
    mutation checkEmail($email: String!) {
      checkEmail(email: $email) {
        status {
          success
          message
        }
        data {
          newUser
        }
      }
    }
  `,
  RegisterV2 = gql`
    mutation registerV2(
      $firstName: String!
      $lastName: String!
      $email: String!
      $type: String
      $spaceOrgName: String
      $code: Float
    ) {
      registerV2(
        firstName: $firstName
        lastName: $lastName
        email: $email
        type: $type
        spaceOrgName: $spaceOrgName
        code: $code
      ) {
        status {
          success
          message
        }
      }
    }
  `,
  VerifyEmail = gql`
    mutation verifyEmail($email: String!, $verificationCode: Int) {
      verifyEmail(email: $email, verificationCode: $verificationCode) {
        status {
          success
          message
        }
        data {
          accessToken
          refreshToken
          id
          firstName
          lastName
          newUser
        }
      }
    }
  `,
  SendVerificationMail = gql`
    mutation sendVerficationMail($email: String!) {
      sendVerficationMail(email: $email) {
        status {
          success
          message
        }
      }
    }
  `,
  GoogleLogin = gql`
    mutation google(
      $token: String!
      $type: String
      $spaceOrgName: String
      $code: String
    ) {
      google(
        token: $token
        type: $type
        spaceOrgName: $spaceOrgName
        code: $code
      ) {
        status {
          success
          message
        }
        data {
          accessToken
          refreshToken
          firstName
          lastName
          username
          role
          newUser
          id
          userAddedToOrg
          spaceOrgName
        }
      }
    }
  `,
  AddComment = gql`
    mutation addComment(
      $postId: String!
      $commentText: String
      $parentId: String
      $replyTo: String
    ) {
      addComment(
        postId: $postId
        commentText: $commentText
        parentId: $parentId
        replyTo: $replyTo
      ) {
        status {
          success
          message
        }
        data {
          _id
          userId
          postId
          parentId
          commentText
          commentImage
          date
          repliesCount
          upVoteCount
          replyTo
          upVoted

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
  `,
  AddEducation = gql`
    mutation addEducation(
      $school: String!
      $degree: String
      $major: String
      $startDate: String!
      $graduationDate: String!
    ) {
      addEducation(
        school: $school
        degree: $degree
        major: $major
        startDate: $startDate
        graduationDate: $graduationDate
      ) {
        status {
          success
          message
        }
        education {
          private
          schools {
            _id
            school
            degree
            major
            startDate
            graduationDate
          }
        }
      }
    }
  `,
  AddPost = gql`
    mutation addPost(
      $postText: String!
      $unitId: Float
      $tags: [TagsInput]
      $postTag: String
      $id: String!
      $levelOfStudy: String
      $major: String
      $gpa: Float
      $testScore: TestScoreEnum
      $testScoreMark: TestScoreMark
      $preferredLocation: String
      $universitySearch: String
      $anonymityOption: Boolean
      $relationToMajor: Boolean
      $attendAgain: Boolean
      $reviewSubCategories: String
      $admissionAndApplicationRating: Int
      $financialAidAndScholarshipRating: Int
      $academicProgramsAndDepartmentRating: Int
      $studentLifeAndServiceRating: Int
      $careerAndAlumniResourceRating: Int
      $postTags: PostTagsInput
      $title: String!
    ) {
      addPost(
        postText: $postText
        unitId: $unitId
        tags: $tags
        postTag: $postTag
        id: $id
        levelOfStudy: $levelOfStudy
        major: $major
        gpa: $gpa
        testScore: $testScore
        testScoreMark: $testScoreMark
        preferredLocation: $preferredLocation
        universitySearch: $universitySearch
        anonymityOption: $anonymityOption
        relationToMajor: $relationToMajor
        attendAgain: $attendAgain
        reviewSubCategories: $reviewSubCategories
        admissionAndApplicationRating: $admissionAndApplicationRating
        financialAidAndScholarshipRating: $financialAidAndScholarshipRating
        academicProgramsAndDepartmentRating: $academicProgramsAndDepartmentRating
        studentLifeAndServiceRating: $studentLifeAndServiceRating
        careerAndAlumniResourceRating: $careerAndAlumniResourceRating
        postTags: $postTags
        title: $title
      ) {
        status {
          success
          message
        }
        post {
          section
          postText
          admissionAndApplicationRating
          financialAidAndScholarshipRating
          academicProgramsAndDepartmentRating
          studentLifeAndServiceRating
          careerAndAlumniResourceRating
          upVoted
          upVoteCount
          postCommentsCount
          type
          saved
          videoURL
          event {
            _id
            title
            description
            isRegistered
            address
            eventDate
            interestedUsers {
              userId
            }
            images
          }
          tags {
             name
             entityType
             universityCount
             unitId
            _id
          }
          postType
          levelOfStudy
          postTags {
            tagType
            tag {
              _id
              name
            }
          }
          date
          _id
          images
          user {
            firstName
            lastName
            picture
            username
            _id
          }
          elevatorInfo {
            tags
            ownType
            name
            tags
            majors {
              title
            }
            pictures
            address {
              streetAddressOrPOBox
              city
              stateAbbreviation
              zipCode
            }
            name
          }
          studentCharges {
            combinedChargeForRoomAndBoard
            undergraduateApplicationFee
            graduateApplicationFee
            unitId
            undergraduate {
              inState {
                tuition
                requiredFees
                perCreditHourCharge
              }
              outOfState {
                tuition
                requiredFees
                perCreditHourCharge
              }
              inDistrict {
                tuition
                requiredFees
                perCreditHourCharge
              }
              onCampus {
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              offCampusWithFamily {
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              offCampusNotWithFamily {
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              booksAndSupplies
            }

            graduate {
              inState {
                tuition
                requiredFees
                perCreditHourCharge
              }
              outOfState {
                tuition
                requiredFees
                perCreditHourCharge
              }
              inDistrict {
                tuition
                requiredFees
                perCreditHourCharge
              }
            }
          }
          suggestedOrgs {
            name
            type
            spaces {
              _id
              name
              description
              image
            }
          }
          suggestedSpace {
            type
            name
            spaces {
              _id
              name
              description
              image
            }
          }
          userEvaluation {
            unitId
            rankings {
              rank
              title
              totalPlayers
            }
            report {
              academics
              average
              value
              diversity
              campus
              atheltics
              partyScene
              professors
              location
              dorms
              campusFood
              studentLife
              safety
            }
            reviews {
              rating
              type
              votes
            }
          }

          unitId
          applied_level
          status
          attempt
          university
          conversation
          major
          title
        }
      }
    }
  `,
  GetPostById = gql`
    query getPostById($id: String!, $user: String) {
      getPostById(id: $id, user: $user) {
        status {
          success
          message
        }
        post {
          _id
          postText
          postCommentsCount
          admissionAndApplicationRating
          financialAidAndScholarshipRating
          academicProgramsAndDepartmentRating
          studentLifeAndServiceRating
          careerAndAlumniResourceRating
          postType
          postImage
          videoURL
          date
          tags {
            _id
            name
            parentId
            image
            description
          }
          postTags {
            tagType
            tag {
              _id
              name
            }
          }
          upVoted
          images
          upVoteCount
          user {
            _id
            firstName
            lastName
            username
            picture
          }
          comments {
            _id
            commentText
            upVoted
            upVoteCount
            user {
              _id
              firstName
              lastName
              picture
              username
            }
          }
        }
      }
    }
  `,
  EditPost = gql`
    mutation editPost($postId: String!, $postText: String!) {
      editPost(postId: $postId, postText: $postText) {
        status {
          success
          message
        }
      }
    }
  `,
  DeletePost = gql`
    mutation deletePost($postId: String!) {
      deletePost(postId: $postId) {
        success
        message
      }
    }
  `,
  DeleteComment = gql`
    mutation deleteComment($id: String!) {
      deleteComment(id: $id) {
        status {
          success
          message
        }
      }
    }
  `,
  EditAbout = gql`
    mutation editAbout($about: String!) {
      editAbout(about: $about) {
        status {
          success
          message
        }
        about {
          text
          private
        }
      }
    }
  `,
  EditEducation = gql`
    mutation editEducation(
      $id: String!
      $school: String!
      $degree: String
      $major: String
      $startDate: String!
      $graduationDate: String!
    ) {
      editEducation(
        id: $id
        school: $school
        degree: $degree
        major: $major
        startDate: $startDate
        graduationDate: $graduationDate
      ) {
        status {
          success
          message
        }
        education {
          private
          schools {
            _id
            school
            degree
            major
            startDate
            graduationDate
          }
        }
      }
    }
  `,
  EditProfile = gql`
    mutation editProfile(
      $picture: String
      $coverPicture: String
      $username: String
      $firstName: String
      $lastName: String
      $location: String
      $oneLinerBio: String
      $birthday: String
      $interestedSubjects: [ID]
      $userStatus: String
      $studyLevel: String
      $interestedUni: [Int]
    ) {
      editProfile(
        picture: $picture
        coverPicture: $coverPicture
        username: $username
        firstName: $firstName
        lastName: $lastName
        location: $location
        oneLinerBio: $oneLinerBio
        birthday: $birthday
        interestedSubjects: $interestedSubjects
        userStatus: $userStatus
        studyLevel: $studyLevel
        interestedUni: $interestedUni
      ) {
        status {
          success
          message
        }
        user {
          firstName
          lastName
          username
          oneLinerBio
          location
          age
          gender
          birthday
          name
          role
          verified
          blocked
          banned
          active
          picture
          doj
        }
      }
    }
  `,
  GetCommentList = gql`
    query commentList($postId: String!, $parentId: String) {
      commentList(postId: $postId, parentId: $parentId) {
        status {
          success
          message
        }
        isPostUpVotedByCurrentUser
        validToken
        data {
          _id
          userId
          postId
          parentId
          commentText
          commentImage
          date
          repliesCount
          upVoteCount
          replyTo
          upVoted
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
  `,
  EditComment = gql`
    mutation editComment($commentId: String!, $commentText: String!) {
      editComment(commentId: $commentId, commentText: $commentText) {
        status {
          success
          message
        }
          data{
              _id
            userId
            postId
            parentId
            commentText
            commentImage
            upVoteCount
            replyTo
            date
            user{
              firstName
              lastName
            }
            upVoted
            repliesCount
          }
      }
    }
  `,
  GetReplyList = (id: any, pid: any) =>
    gql`
        query {
            replyList (postId:"${id}", parentId:"${pid}") {
            success
            message
                        comments {
                        _id
                        userId
                        postId
                        commentText
                        commentImage
                        firstName
                        lastName
                        username
                        date
                        }
            }
        }`,
  GetSavedList = gql`
    query savedList($userId: String!, $page: Float) {
      savedList(userId: $userId, page: $page, pageSize: 5) {
        status {
          success
          message
        }
        Posts {
          _id
          postText
          images
          postImage
          date
          postCommentsCount
          upVoted
          upVoteCount
          saved
          user {
            _id
            firstName
            lastName
            username
            picture
          }
        }
        totalPosts
      }
    }
  `,
  getUserGql = gql`
    query getUser($username: String!) {
      getUser(username: $username) {
        connectionType {
          requestorId
          receiverId
          status
        }
        user {
          firstName
          lastName
          username
          age
          gender
          birthday
          name
          role
          verified
          location
          studyLevel
          oneLinerBio
          doj
          blocked
          banned
          active
          picture
          coverPicture
          _id
          about {
            text
            private
          }
          badges {
            private
            earnedBadges {
              title
              description
              date
            }
          }
          education {
            private
            schools {
              _id
              school
              degree
              major
              startDate
              graduationDate
            }
          }
          testScore {
            private
            scores {
              SAT_SCORE {
                english
                maths
              }
              ACT_SCORE {
                english
                maths
              }
              IELTS_SCORE {
                score
              }
              TOEFL_SCORE {
                score
              }
            }
          }
        }
      }
    }
  `,
  GetVoterList = gql`
    query upVoteList($postId: String!, $page: Float) {
      upVoteList(postId: $postId, page: $page) {
        success
        message
        upVoters {
          _id
          firstName
          lastName
          picture
        }
      }
    }
  `,
  receivedGuestbookList = gql`
    query receivedGuestbookList(
      $userId: String!
      $page: Float
      $pageSize: Float
    ) {
      receivedGuestbookList(userId: $userId, page: $page, pageSize: $pageSize) {
        status {
          success
          message
        }
        guestbook {
          _id
          date
          message
          user {
            firstName
            lastName
            username
            verified
            picture
          }
        }
      }
    }
  `,
  SavePost = gql`
    mutation save($postId: String!) {
      save(postId: $postId) {
        success
        message
      }
    }
  `,
  UnSavePost = gql`
    mutation unSave($postId: String!) {
      unSave(postId: $postId) {
        success
        message
      }
    }
  `,
  sendGuestbookMessage = gql`
    mutation sendGuestbookMessage($receiverId: String!, $message: String!) {
      sendGuestbookMessage(receiverId: $receiverId, message: $message) {
        status {
          success
          message
        }
      }
    }
  `,
  ToggleView = gql`
    mutation toggleView($card: String!) {
      toggleView(card: $card) {
        status {
          success
          message
        }
        private
      }
    }
  `,
  UpVote = gql`
    mutation upVote($postId: String!) {
      upVote(postId: $postId) {
        upVotesCount
        success
        message
        voteExist
      }
    }
  `,
  DeleteEducation = gql`
    mutation deleteEducation($id: String!) {
      deleteEducation(id: $id) {
        status {
          success
          message
        }
        education {
          private
          schools {
            _id
            school
            degree
            major
            startDate
            graduationDate
          }
        }
      }
    }
  `,
  SendConnectRequest = gql`
    mutation sendConnectRequest($receiverId: String!) {
      sendConnectRequest(receiverId: $receiverId) {
        success
        message
      }
    }
  `,
  RemoveConnectRequest = gql`
    mutation removeConnectRequest($connecteeId: String!) {
      removeConnectRequest(connecteeId: $connecteeId) {
        success
        message
      }
    }
  `,
  ReceivedConnectionList = gql`
    query {
      receivedConnectionList {
        status {
          success
          message
        }
        connectionList {
          _id
          status
          date
          user {
            _id
            firstName
            lastName
            username
            oneLinerBio
            birthday
            name
            role
            verified
            active
            picture
            coverPicture
            location
          }
        }
      }
    }
  `,
  PendingConnectionList = gql`
    query {
      pendingConnectionList {
        status {
          success
          message
        }
        connectionList {
          _id
          status
          date
          user {
            _id
            firstName
            lastName
            username
            oneLinerBio
            birthday
            name
            role
            verified
            active
            picture
            location
            coverPicture
          }
        }
      }
    }
  `,
  ConnectedList = gql`
    query connectedList($userId: String!) {
      connectedList(userId: $userId) {
        status {
          message
          success
        }
        connectionList {
          date
          user {
            firstName
            lastName
            username
            _id
            picture
          }
        }
      }
    }
  `,
  AcceptConnectRequest = gql`
    mutation acceptConnectRequest($requestorId: String!) {
      acceptConnectRequest(requestorId: $requestorId) {
        success
        message
      }
    }
  `,
  RecommendedConnectionList = gql`
    query {
      recommendedConnectionList {
        status {
          message
          success
        }
        user {
          _id
          firstName
          lastName
          username
          picture
          coverPicture
          location
        }
      }
    }
  `,
  getNewsFeed = gql`
    query fetchFeedV2($feedQuery: FeedQueryInput) {
      fetchFeedV2(feedQuery: $feedQuery) {
        validToken
        data {
          section
          postText
          admissionAndApplicationRating
          financialAidAndScholarshipRating
          academicProgramsAndDepartmentRating
          studentLifeAndServiceRating
          careerAndAlumniResourceRating
          upVoted
          upVoteCount
          postCommentsCount
          type
          saved
          postType
          levelOfStudy
          videoURL
          postTags {
            tagType
            tag {
              _id
              name
            }
          }
          event {
            _id
            title
            description
            isRegistered
            address
            eventDate
            interestedUsers {
              userId
            }
            images
          }

          date
          _id
          images
          user {
            firstName
            lastName
            picture
            username
            _id
          }
          elevatorInfo {
            tags
            ownType
            name
            tags
            majors {
              title
            }
            pictures
            address {
              streetAddressOrPOBox
              city
              stateAbbreviation
              zipCode
            }
            name
          }
          studentCharges {
            combinedChargeForRoomAndBoard
            undergraduateApplicationFee
            graduateApplicationFee
            unitId
            undergraduate {
              inState {
                tuition
                requiredFees
                perCreditHourCharge
              }
              outOfState {
                tuition
                requiredFees
                perCreditHourCharge
              }
              inDistrict {
                tuition
                requiredFees
                perCreditHourCharge
              }
              onCampus {
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              offCampusWithFamily {
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              offCampusNotWithFamily {
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              booksAndSupplies
            }

            graduate {
              inState {
                tuition
                requiredFees
                perCreditHourCharge
              }
              outOfState {
                tuition
                requiredFees
                perCreditHourCharge
              }
              inDistrict {
                tuition
                requiredFees
                perCreditHourCharge
              }
            }
          }
          suggestedOrgs {
            name
            type
            spaces {
              _id
              name
              description
              image
            }
          }
          suggestedSpace {
            type
            name
            spaces {
              _id
              name
              description
              image
            }
          }
          userEvaluation {
            unitId
            rankings {
              rank
              title
              totalPlayers
            }
            report {
              academics
              average
              value
              diversity
              campus
              atheltics
              partyScene
              professors
              location
              dorms
              campusFood
              studentLife
              safety
            }
            reviews {
              rating
              type
              votes
            }
          }

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
  `,
  GetInterviewExperience = gql`
    query getInterviewExperience($unitId: Float!, $page: Int, $pageSize: Int) {
      getInterviewExperience(
        unitId: $unitId
        page: $page
        pageSize: $pageSize
      ) {
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
  `,
  GetSpaceCategory = gql`
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
  `,
  GetOrgSpace = gql`
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
  `,
  GetAllPostByOrgSpaceID = gql`
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
  `,
  GetAllEventsBySpaceID = gql`
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
  `,
  GetTopActiveSpaces = `
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
  `,
  CreateOrgSpace = gql`
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
  `,
  GetTopOrgs = gql`
    query getTopOrgSpace {
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
  `,
  AddSpaceCategory = gql`
    mutation addSpaceCategory(
      $name: String!
      $parentId: String
      $description: String
      $isOrgSpace: Boolean
    ) {
      addSpaceCategory(
        name: $name
        parentId: $parentId
        description: $description
        isOrgSpace: $isOrgSpace
      ) {
        status {
          success
          message
        }
        data {
          _id
          name
        }
      }
    }
  `,
  AddSpaceEvent = gql`
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
  `,
  GetSpaceEvents = gql`
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
  `,
  DeleteSpace = gql`
    mutation deleteSpaceCategoryById($id: ID!) {
      deleteSpaceCategoryById(id: $id) {
        status {
          success
          message
        }
      }
    }
  `,
  DeleteOrgSpace = gql`
    mutation deleteOrgSpaceById($id: ID!) {
      deleteOrgSpaceById(id: $id) {
        status {
          success
          message
        }
      }
    }
  `,
  GetAllQuestions = gql`
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
  `,
  GetAllMembersBySpaceID = gql`
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
            interestedSubjects
            title
            startDate
            endDate
          }
          alumini {
            _id
            firstName
            lastName
            username
            picture
            interestedSubjects
            title
            startDate
            endDate
          }
          students {
            _id
            firstName
            lastName
            username
            picture
            interestedSubjects
            title
            startDate
            endDate
          }
        }
      }
    }
  `,
  EditSpace = gql`
    mutation editSpaceCategoryById(
      $id: ID!
      $name: String!
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
        data {
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
  `,
  UpateOrgSpace = gql`
    mutation updateOrgSpaceById(
      $id: ID!
      $name: String!
      $image: String
      $description: String
    ) {
      updateOrgSpaceById(
        id: $id
        name: $name
        image: $image
        description: $description
      ) {
        status {
          message
          success
        }
        data {
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
  `,
  GetOwnSpace = gql`
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
  `,
  GenerateSpaceNewsFeed = gql`
    query GenerateSpaceNewsFeed($limit: Int, $page: Int) {
      generateSpaceNewsFeedSystem(limit: $limit, page: $page) {
        status {
          message
          success
        }
        data {
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
  `,
  GetUserRoadMapSummary = gql`
    query getUserRoadMapSummary($userId: ID!) {
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
  `,
  fetchFamousUniversities = gql`
    query getFamousUniversity {
      getFamousUniversity {
        unitId
        name
        pictures
      }
    }
  `,
  RegisterUserEvent = gql`
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
  `,
  DeleteEventById = gql`
    mutation deleteEventById($eventId: ID!) {
      deleteEventById(eventId: $eventId) {
        status {
          success
          message
        }
      }
    }
  `,
  GetAllHistoryYear = gql`
    query GetAllHistoryYear($orgId: ID!) {
      getAllHistoryYear(orgId: $orgId) {
        status {
          success
          message
        }
        data
      }
    }
  `,
  GetAllHistory = gql`
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
  `,
  AddNewHistory = gql`
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
  `,
  Search = gql`
    query Search(
      $q: String!
      $user: Boolean
      $school: Boolean
      $space: Boolean
      $org: Boolean
      $orgId: ID
      $post: Boolean
    ) {
      search(
        q: $q
        user: $user
        school: $school
        space: $space
        org: $org
        orgId: $orgId
        post: $post
      ) {
        totalItems
        items {
          _id
          name
          type
          username
          picture
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
          name
          coverPicture
        }
        orgs {
          name
          description
        }
        posts{
          _id
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
            firstName
            lastName
            username
            picture
            username
          }
            title
        }
      }
    }
  `,
  GetAllHistoryEvents = gql`
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
  `,
  EditHistory = gql`
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
  `,
  GetUserPost = gql`
    query getDicussionUniWall($userId: String, $page: Float!, $unitId: Float) {
      getDicussionUniWall(
        userId: $userId
        page: $page
        pageSize: 3
        unitId: $unitId
      ) {
        _id
        images
        postText
        date
        upVoteCount
        postCommentsCount
        userId # Use userId instead of user
        user {
          _id
          firstName
          lastName
          picture
          username
        }
        saved
        upVoted
        admissionAndApplicationRating
        financialAidAndScholarshipRating
        academicProgramsAndDepartmentRating
        studentLifeAndServiceRating
        careerAndAlumniResourceRating
      }
    }
  `,
  GetAllPostBySpaceCategoryID = gql`
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
  `,
  AddTestScore = (testScores: any) =>
    gql`
        mutation addTestScore($testScores: ${testScores}) {
            addTestScore(testScore: $testScores) {
            status {
                message
                success
            }
            testScore {
                scores {
                SAT_SCORE {
                    maths
                    english
                }
                ACT_SCORE {
                    maths
                    english
                }
                IELTS_SCORE {
                    score
                }
                TOEFL_SCORE {
                    score
                }
                }
            }
            }
        }`,
ADD_NOTES = gql`
 mutation AddNotes($notes: String!) {
    addNotes(notes: $notes) {
      status {
        success
        message
      }
    }
  }
`,
proxyImage = gql`
 query proxyImages($url: String!) {
    proxyImages(url: $url) {
    success
      data {
        contentType
        base64Data
        size
        originalUrl
      }
    }
  }
`,

getSearchImages = gql`
query searchImages($q: String) {
  searchImages( q: $q  ){
     images{
     link
    }
  } 
}`,
  GET_METADATA_TAGS = gql`
    fragment AddAPostDetails on AddAPostQuery {
      suggestMeUniversity {
        ...NodeDetails
      }
      questionAboutUniversity {
        ...NodeDetails
      }
      reviewUniversity {
        ...NodeDetails
      }
      others {
        ...NodeDetails
      }

      questionAboutUniversity {
        ...NodeDetails
      }
      reviewUniversity {
        ...NodeDetails
      }
      others {
        ...NodeDetails
      }
      event {
        ...NodeDetails
      }
    }
    fragment NodeDetails on NodeQuery {
      id
      name
      type
      api
      edges {
        id
        name
        type
        options
        validation {
          min
          max
        }
        api
        rating
        color
        placeholder
        initialVisible
        userAnswer
      }
      rating
      color
      icon
    }

    query GetMetadataTags {
      getMetadataTags {
        data {
          home {
            addAPost {
              ...AddAPostDetails
            }
          }
          feed {
            addAPost {
              ...AddAPostDetails
            }
          }
          org {
            addAPost {
              ...AddAPostDetails
            }
          }
          space {
            addAPost {
              ...AddAPostDetails
            }
          }
          university {
            addAPost {
              ...AddAPostDetails
            }
          }
        }
      }
    }
  `;
