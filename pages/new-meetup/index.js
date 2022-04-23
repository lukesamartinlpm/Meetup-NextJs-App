import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetupData),
    });

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>NewMeetup</title>
        <meta name="description" content="Create a new meetup!"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
