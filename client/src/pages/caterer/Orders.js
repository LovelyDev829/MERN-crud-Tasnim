import { Modal } from "@material-ui/core";
import React, { useState } from "react";

const Categories = () => {
  const categoryData = [
    {
      categoryID: 1,
      categoryName: "Burger(s) - 2 orders",
      status: 1,
    },
    {
      categoryID: 2,
      categoryName: "Coffee -    4 orders  ",
      status: 1,
    },
    {
      categoryID: 3,
      categoryName: "Hot Wings - 1 order ",
      status: 1,
    },
    {
      categoryID: 4,
      categoryName: "Sandwich - 5 orders ",
      status: 1,
    },
    {
      categoryID: 5,
      categoryName: "BBQ Ribs - 4 orders ",
      status: 1,
    },
  ];

  const [open, setOpen] = useState(false);

  const [categoryIDActive, setCategoryIDActive] = useState(false);
  const [categoryNameActive, setCategoryNameActive] = useState(false);
  const [categoryStatusActive, setCategoryStatusActive] = useState(false);

  const [obj, setObj] = useState({
    categoryID: -1,
    categoryName: "",
    status: -1,
  });

  const handleInput = (type, value) => {
    let temp = obj;
    if (type === "categoryID") {
      temp["categoryID"] = parseInt(value);
      setCategoryIDActive(false);
    } else if (type === "categoryName") {
      temp["categoryName"] = value;
      setCategoryNameActive(false);
    } else if (type === "categoryStatus") {
      temp["status"] = parseInt(value);
      setCategoryStatusActive(false);
    }
  };

  return (
    <>
      <div className="text-3xl">Orders</div>

      {/* SEARCH AREA */}
      <div className="flex flex-row justify-center mt-10">
        <div className="p-2 font-semibold text-lg">Search Orders</div>
        <div className="w-2/3 p-2">
          <input className="w-full border-b-2 border-gray-600" />
        </div>
        <div className="p-2 mb-5 bg-sky-500 rounded-2xl font-semibold">
          <span className="p-1 text-white">Search</span>
        </div>
      </div>

      {/* TABLE */}
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center">
                <thead class="border-b bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-white px-6 py-4"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-white px-6 py-4"
                    >
                      Orders
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-white px-6 py-4"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-white px-6 py-4"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData?.map((category, index) => (
                    <React.Fragment key={index}>
                      <tr class="bg-white border-b">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {category.categoryID}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {category.categoryName}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {category.status === 1 ? "active" : "disabled"}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="bg-sky-500 rounded-2xl font-semibold">
                            <span className="p-1 text-white">Search</span>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-row justify-center">
                <div
                  className="w-2/6 p-2 mt-10 bg-sky-500 rounded-2xl font-semibold"
                  onClick={() => setOpen(true)}
                >
                  <span className="p-1 text-white">Create New Order(s)</span>
                </div>
              </div>

              {/* ADD NEW CATEGORY */}
              <Modal open={open} onClose={() => setOpen(false)}>
                <div className="flex justify-center items-center h-screen">
                  <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg">
                    <div className="px-6 py-7 bg-white">
                      <div className="px-6 text-3xl font-thin text-gray-900 text-center">
                        <div>Create An Order</div>
                      </div>

                      <input
                        className={
                          categoryIDActive
                            ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                            : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
                        }
                        placeholder="Enter Order ID"
                        onFocus={() => setCategoryIDActive(true)}
                        onBlur={(e) =>
                          handleInput("categoryID", e.target.value)
                        }
                      />

                      <div className="pt-4"></div>

                      <input
                        className={
                          categoryNameActive
                            ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                            : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
                        }
                        placeholder="Enter Order Name"
                        onFocus={() => setCategoryNameActive(true)}
                        onBlur={(e) =>
                          handleInput("categoryName", e.target.value)
                        }
                      />

                      <div className="pt-4"></div>

                      <input
                        className={
                          categoryStatusActive
                            ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                            : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
                        }
                        placeholder="Enter status"
                        onFocus={() => setCategoryStatusActive(true)}
                        onBlur={(e) =>
                          handleInput("categoryStatus", e.target.value)
                        }
                      />

                      {/* <div className="text-center font-medium text-sky-800">
                        Don&apos;t have an account?
                        <span className="text-red-500 underline">
                          {" "}
                          Register Here!!
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
