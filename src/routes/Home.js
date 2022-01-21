import React, { useEffect, useState } from "react";
import { dbService } from "./../fbase";
import Rweet from "components/Rweet";
import RweetFactory from "components/RweetFactory";
import Profile from "./Profile";

const Home = ({ refreshUser, userObj }) => {
  const [rweets, setRweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("rweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const rweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRweets(rweetArray);
      });
  }, []);
  console.log(userObj.displayName);
  return (
    <>
      {userObj.displayName ? (
        <div className="container">
          <RweetFactory userObj={userObj} />
          <div div style={{ marginTop: 30 }}>
            {rweets.map((rweet) => (
              <Rweet
                key={rweet.id}
                rweetObj={rweet}
                isOwner={rweet.creatorId === userObj.uid}
                userObj={userObj}
              />
            ))}
          </div>
        </div>
      ) : (
        <Profile refreshUser={refreshUser} userObj={userObj} />
      )}
    </>
  );
};

export default Home;
