import { React, useState, useEffect } from "react";
import axios from "axios";
import Forms from "../Forms/Forms";

function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Forms />
    </>
  );
}

export default Home;
