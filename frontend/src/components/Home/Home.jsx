import { React, useState, useEffect } from "react";
import axios from 'axios';
import Forms from "../Forms/Forms";
import Loader from "../Loader/Loader";

function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Loader />
      <Forms />
    </>
  );
}

export default Home;
