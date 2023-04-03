import { React, useState, useEffect } from "react";
import axios from 'axios';
import Forms from "../Forms/Forms";
import Loader from "../Loader/Loader";
// import Model from "../Model/Model";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors")
      .then((response) => {
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Loader />
      <Forms />
      {/* <Model /> */}
    </>
  );
}

export default Home;
