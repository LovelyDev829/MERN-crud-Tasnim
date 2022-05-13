import React, { useEffect } from "react";
import "./AnotherHome.css";
import Banner from "./Banner";
import Card from "./Card";
import LoggedInUser from "../LoggedInUser";

//ES7 extesnion is added to do'rfce' which is basically adding the snippets.
localStorage.setItem("userID", "");
localStorage.setItem("password", "");
localStorage.setItem("authenticated", false);

function AnotherHome() {
  return (
    <div className="home">
      <Banner />
      <div className="home__section">
        <Card
          src="https://cdn.pixabay.com/photo/2016/11/29/05/55/kitchen-1867663_1280.jpg"
          title="Best Caterers"
          description="The Caterers whose tireless effort makes your food awesome."
        />
        <Card
          src="https://cdn.pixabay.com/photo/2016/05/24/13/29/olive-oil-1412361_1280.jpg"
          title="Fresh Ingredients"
          description="It’s a scientific fact that cooking with fresh ingredients makes your food taste better."
        />
        <Card
          src="https://cdn.pixabay.com/photo/2018/04/13/17/12/vegetable-skewer-3317055_1280.jpg"
          title="Healthy Food"
          description=" Our Caterers use batch cooking to prepare smaller portions of food during 
                service to produce an enhanced fresh food experience."
        />
      </div>

      <div className="hot__topics">
        <Card
          src="https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg"
          title="Salmon Teriyaki"
          description="Give Some Description"
          price="$15"
        />
        <Card
          src="https://cdn.pixabay.com/photo/2017/09/30/15/10/plate-2802332_1280.jpg"
          title="Gourmet Pizza"
          description="Give Some Description"
          price="$23(12 inch)"
        />
        <Card
          src="https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908_1280.jpg"
          title="Grilled Chicken"
          description="Give Some Description"
          price="$16 "
        />
      </div>
      {console.log(LoggedInUser.user)}
      {localStorage.getItem("userID") === ""
        ? console.log("NO USER FOUND")
        : "USER FOUND"}
    </div>
  );
}

export default AnotherHome;
