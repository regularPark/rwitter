import React, { useEffect, useState } from "react";
import { dbService, storageService } from "./../fbase";
import Rweet from "components/Rweet";
import RweetFactory from "components/RweetFactory";

const Home = ({ userObj }) => {
  const [rweets, setRweets] = useState([]);
  useEffect(() => {
    dbService.collection("rweets").onSnapshot((snapshot) => {
      const rweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRweets(rweetArray);
    });
  }, []);

  return (
    <div>
      <RweetFactory userObj={userObj} />
      <div>
        {rweets.map((rweet) => (
          <Rweet
            key={rweet.id}
            rweetObj={rweet}
            isOwner={rweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
