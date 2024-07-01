import React from 'react';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/layouts/main-layout.astro';
 import ThreadAction from '@/components/thread/thread.action.astro';
import Comments from '@/components/thread/comments/index.astro';
import SingleThread from '@/components/thread/singlethread';
import linkifyHtml from 'linkify-html';
import { formatDate } from '@/lib/utils';
import { ThreadHeader } from '@/components/thread/threadHeader';
import { useAstroQuery } from '@/datasource/apollo-client';
import { useQuery } from '@apollo/client';
import { GetPostById } from '@/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';

let data2 = {
    _id: '667c3b8cebc4e892ddcd7254',
    postText:
      "<p>So here goes my experience</p><p>First attempt: March 21 2024</p><p>Vo: So called curly vo</p><p>Stats:&nbsp;</p><p>10:3.65</p><p>11:3.33</p><p>12:3.5</p><p>Duolingo:120</p><p>Sat:1310</p><p>University: Southeastern Louisiana University&nbsp;</p><p>I was motivating other candidates as most of them were really nervous and some were shivering as well. I tried to motivate them but later every one of them got their visa I was really embarrassed after I saw them with green slip outside.</p><p>First attempt</p><p>Me: Hello mam hope you are doing well.</p><p>Curly: ignored and asked why this uni</p><p>Me: talked about professor research and how it aligns with my area of interest and added about scholarship&nbsp;</p><p>Curly: how many university did you applied?</p><p>Me:I am applied to around 20 universities&nbsp;</p><p>Curly: what was your second choice? Which one would you have gone with if not southeastern?</p><p>Me: Texas state university&nbsp;</p><p>Curly: compare txst and southeastern</p><p>Me: (completely unexpected qns was fumbling a bit) talked about affordability&nbsp;</p><p>Curly: sorry you are not eligible for this visa</p><p>Me: thank you mam hope you will have a wonderful day&nbsp;</p><p>She didn't looked at my transcript, ept, sat or coa nothing at all</p><p>Was in trauma for these 3 month. Each and every friend of mine got their visa approved and I didn't know I should be happy or sad&nbsp;</p><p><br></p><p>Got slot for June 26 luckily&nbsp;</p><p>Yo Pali ta I was damn confident first attempt vanda ni dherai I wasn't hoping for approval but was enjoying every moment there yeti dherai sanga bole hola sab lai guff handai Basya thiye&nbsp;</p><p>Visa rate 50-50 thiyo Chinese le 10-15 minutes interview lidai thin aru le ni Ali ali reject hanya thiye&nbsp;</p><p>Nothing was changed this time same university same everything. Ma yeti demotivate vako thiye ni tyo manxe haru le same university gayo vane straight rejection vaneko sunera tei ni I didn't believe that and was there with same university same i20</p><p><br></p><p>So here goes my second attempt:</p><p>Vo: brownish hair thiyo maile chinina Naya hola</p><p>Me: Hello sir goodmorning (3 baje goodmorning vande xu vo ni hasyo ani maile sorry sir good afternoon vane)&nbsp;</p><p>Vo: he looked at the computer screen for around 15 sec and asked you are going with the same university right? what do you found that special that you are still committed to same university?</p><p>Me: I was really impressed by their computer science department specially professor Dr.Ghassan alkadi who is researching on .... Interrupted</p><p>Vo: tell me some other thing&nbsp;</p><p>Me: They had really unique course curriculum. They had a unique blend of both computer science and business courses where I will get to learn about few bussiness courses like micro and macro economics. Interrupted..</p><p>Vo: so you are interested in business as well right?</p><p>Me: as I am going for computer Science major with the concentration on data science I will work with companies to help in their business as a data scientist in near future and these bussiness courses will definitely help me to do so.</p><p>Vo: tell me about your sponsors</p><p>Me: My father is the supplier of automobile spears and parts. He basically supplies different parts of vehicles to various garages. He makes around 20k usd</p><p>Vo: ok</p><p>Me: should I also mention about my mother profession?</p><p>Vo: go on</p><p>Me: she is a government officer she works in a ward office and makes around 10k usd.</p><p>Vo: okay do you have any siblings?</p><p>Me: yeah I do have a sister</p><p>Vo: older or younger&nbsp;</p><p>Me: younger she studies in grade 8</p><p>Vo: who do you think is more smarter?</p><p>Me: I think I am</p><p>Vo: why do you think so?</p><p>Me: I don't have any specific reason and laughed (he also laughed)</p><p>Vo: looked at the computer screen for around 20 more second put my passport some where and passed green slip</p><p>Me: kei navani tapp Kase</p><p>&nbsp;Finally after 3 month of trauma. I did it.</p><p>Luck really really matters. Tyo same university gayo vane straight rejection hunxa vanne haru lai chai Malai kei vannu xaina. And I would like to thank curly vo who rejected me. That rejection has taught me a lot of things and has let me recognize who is really with me.</p><p>Lastly, thank you all my well wisher.</p><p>Best of luck everyone.</p><p>I would really like to thank Prashant dai everyone here in this platform unisala</p>",
    postCommentsCount: 1,
    admissionAndApplicationRating: null,
    financialAidAndScholarshipRating: null,
    academicProgramsAndDepartmentRating: null,
    studentLifeAndServiceRating: null,
    careerAndAlumniResourceRating: null,
    postType: 'others',
    postImage: '',
    videoURL: '',
    date: '2024-06-26T16:02:20.430Z',
    tags: [],
    postTags: {
      tagType: 'uni',
      tag: null,
      __typename: 'PostTags'
    },
    upVoted: false,
    images: [],
    upVoteCount: 1,
    user: {
      _id: '659b151bd8249a9ff5358e04',
      firstName: 'Anonymous',
      lastName: 'User',
      username: 'anonymous',
      picture: null,
      __typename: 'user'
    },
    comments: [
      {
        _id: '667c5366971b8efd8e05db80',
        commentText: '<p>I am glad, i could help!</p>',
        upVoted: null,
        upVoteCount: 0,
        user: {
          _id: '64dd5983d1aa61cf8887f9fa',
          firstName: 'Prashant ',
          lastName: 'Basnet',
          picture: null,
          username: 'prashant.basnet324',
          __typename: 'user'
        },
        __typename: 'CommentDetails'
      }
    ],
    __typename: 'PostDetails'
  };
const linkifiedText = linkifyHtml(data2?.postText, {
  defaultProtocol: 'https',
  className: 'custom-link',
  target: {
    url: '_blank' // Opens links in a new tab
  }
});



function extractHeading(text) {
    // Try to find an h tag first
    const headingMatch = text.match(/<h\d[^>]*>(.*?)<\/h\d>/i);
    if (headingMatch) return headingMatch[1].trim();

    // If no h tag, clean and format the text
    let cleanText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();

    // Insert line breaks at logical points
    cleanText = cleanText
      .replace(/(\d{4})([A-Z])/g, '$1\n$2') // Break after year
      .replace(/([.:])(\d+)/g, '$1\n$2') // Break before numbers after colon or period
      .replace(/([a-z])([A-Z])/g, '$1\n$2'); // Break between lowercase and uppercase

    // Get the first two lines or 150 characters, whichever is shorter
    const lines = cleanText.split('\n');
    let heading = lines.slice(0, 2).join(' - ');

    if (heading.length > 150) {
      heading = heading.slice(0, 147) + '...';
    }

    return heading || 'Thread Details';
  }


const Thread = ({ slug }) => {
    const heading = extractHeading(data2.postText);

    const { data, loading, error } = useQuery(GetPostById, {
        context: { server: USER_SERVICE_GQL },
        variables: { id:"testId" },
    });

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    if (!data) return <div>No data...</div>
  return (
      <section className='container max-w-screen-lg space-y-6 pt-12'>
        <ThreadHeader heading={heading} username={data2.user.username} claps={0} comments={0}  date=''/>
        <ul className='pt-6'>
          <li className='flex flex-col max-md:gap-y-4 md:flex-row w-full'>
            <div className='prose dark:prose-invert prose-img:rounded-3xl max-w-none w-full pb-24'>
              <SingleThread
                htmlText={linkifiedText}
                _id={data2._id}
                tags={data2.tags}
                videoURL={data2.videoURL}
              />
            </div>
          </li>
          {/* <ThreadAction
            heading={heading}
            username={data2.user.username}
            date={formatDate(new Date())}
            claps={12}
            comments={123}
          /> */}
        </ul>
        {/* <Comments /> */}
      </section>
  );
};

export default Thread;

