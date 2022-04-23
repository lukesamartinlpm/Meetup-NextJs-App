import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
const MeetupDetailPage = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
        image={props.meetupData.image}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGODB);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(process.env.MONGODB);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        title: meetup.title,
        description: meetup.description,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      },
    },
  };
}

export default MeetupDetailPage;
