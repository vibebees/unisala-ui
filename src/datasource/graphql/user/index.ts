import { gql } from "@apollo/client";

export const Login = gql`
    mutation login(
      $email: String
      $password: String
      $type: String
      $code: Float
      $spaceOrgName: String
    ) {
      login(
        email: $email
        password: $password
        type: $type
        code: $code
        spaceOrgName: $spaceOrgName
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
  Register = gql`
    mutation register(
      $firstName: String
      $lastName: String
      $email: String
      $password: String
      $type: String
      $spaceOrgName: String
      $code: Float
    ) {
      register(
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
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
      $tags: [ID]
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
      ) {
        status {
          success
          message
        }
        post {
          _id
          postText
          # postImage
          date
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
  // working

  EditProfile = gql`
    mutation editProfile(
      $picture: String
      $coverPicture: String
      $username: String!
      $firstName: String!
      $lastName: String!
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
      }
    }
  `,
  GetReplyList = (id, pid) =>
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
  // working

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
  // working

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
  // working

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
            _id
            name
            parentId
            image
            description
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
  `;
