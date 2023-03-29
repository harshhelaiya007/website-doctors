import React from "react";
import { ReactDOM } from "react";
import Forms from "../Forms/Forms";
import Loader from "../Loader/Loader";

function Home() {
    return <>
        <Loader />
        <Forms />
    </>
}

export default Home;