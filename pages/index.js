import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";

const DUMMY_MEEUPS = [
  {
    id: "m1",
    title: "Grab the Tails",
    description: "Tails the molester cats dogs man",
    address: "Rio De Carnival ,Furry st 12 ap 1555",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Palais_des_Nations_unies%2C_%C3%A0_Gen%C3%A8ve.jpg/1024px-Palais_des_Nations_unies%2C_%C3%A0_Gen%C3%A8ve.jpg",
  },
  {
    id: "m2",
    title: "Nos Foda Group",
    description: "Cat dogs meetups testimonies",
    address: "Brazila Lions st 12 ap 13",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/FCN_Photo_Group.jpg",
  },
];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups Website</title>
        <meta
          name="description"
          content="Amazing meetups waiting for you!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGODB);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
