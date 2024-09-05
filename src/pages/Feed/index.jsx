import Nav from "./Nav";
import Main from "./Main";
import Aside from "./Aside";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/index";
import { useState } from "react";

const Feed = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user_data) => {
      setUser(user_data);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="feed h-screen bg-black overflow-hidden text-white">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
