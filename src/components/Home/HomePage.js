import React from "react";
import videoHomePage from "../../assets/video-homepage.webm";
import { useSelector } from "react-redux";
const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  console.log("account: ", account, "isAuthenticated: ", isAuthenticated);
  return (
    <div className="homePage_container">
      <video autoPlay muted loop>
        {/* <source data-testid="currentWebmVideo" src="/static/home-page/hero/video-1920.webm" type="video/webm"/> */}
        <source src={videoHomePage} type="video/mp4" />
      </video>

      <div className="homepage-content">
        <div className="title-1">There's a better way to ask</div>
        <div className="title-2">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </div>
        <div>
          <button className="title-3"> Get started - it's free</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
