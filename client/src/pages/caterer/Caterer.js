import React, { useState } from "react";

import Dashboard from "./Dashboard";
import Categories from "./Categories";
import Items from "./Items";
import Orders from "./Orders";

const Caterer = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const handleSidebarClick = (type) => {
    if (type === "dashboard") {
      setShowDashboard(true);
      setShowCategories(false);
      setShowItems(false);
      setShowOrders(false);
    } else if (type === "categories") {
      setShowDashboard(false);
      setShowCategories(true);
      setShowItems(false);
      setShowOrders(false);
    } else if (type === "items") {
      setShowDashboard(false);
      setShowCategories(false);
      setShowItems(true);
      setShowOrders(false);
    } else if (type === "orders") {
      setShowDashboard(false);
      setShowCategories(false);
      setShowItems(false);
      setShowOrders(true);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/6 bg-slate-300 h-screen border-2 border-slate-600 rounded-lg">
          <div className="flex flex-col">
            <div
              className="h-10 font-semibold text-2xl m-2 text-gray-900 border-b-2"
              onClick={() => handleSidebarClick("dashboard")}
            >
              Dashboard
            </div>
            <div
              className="h-10 font-semibold text-2xl m-2 text-gray-900 border-b-2"
              onClick={() => handleSidebarClick("categories")}
            >
              Categories
            </div>

            <div
              className="h-10 font-semibold text-2xl m-2 text-gray-900 border-b-2"
              onClick={() => handleSidebarClick("items")}
            >
              Items
            </div>

            <div
              className="h-10 font-semibold text-2xl m-2 text-gray-900 border-b-2"
              onClick={() => handleSidebarClick("orders")}
            >
              Orders
            </div>
          </div>
        </div>

        <div className="w-5/6  h-screen border-2 border-slate-600 rounded-lg">
          {showDashboard ? <Dashboard /> : []}
          {showCategories ? <Categories /> : []}
          {showItems ? <Items /> : []}
          {showOrders ? <Orders /> : []}
        </div>
      </div>
    </>
  );
};

export default Caterer;
