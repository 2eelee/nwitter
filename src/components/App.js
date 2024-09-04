import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  // eslint-disable-next-line
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if (user){
        setIsLoggedIn(user);
        setUserObj(user);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  setInterval(() => console.log(authService.currentUser), 2000);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
