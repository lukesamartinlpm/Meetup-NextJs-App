import styles from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <section className={styles.detail}>
      <img src={props.image} alt={props.title} />
      <h2>{props.title}</h2>
      <h3>{props.address}</h3>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;
