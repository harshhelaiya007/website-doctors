import React from "react";
import Forms from "../Forms/Forms";
import Loader from "../Loader/Loader";
import Model from "../Model/Model";

function Home() {
    return <>
        <Loader />
        <Forms />
        <Model />
    </>
}

export default Home;