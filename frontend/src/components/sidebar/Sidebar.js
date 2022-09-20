import { Fragment, useState } from "react";
import Home from "../../pages/Home";
import Folders from "../../pages/Folders";
import SidebarMenuTabs from "./SidebarComponents/SidebarMenuTabs";
import { Route, Routes } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuAlt2Icon } from "@heroicons/react/outline";

import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(true);

  return (
    <>
      <SidebarMenuTabs
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div>
        <div className="md:pl-64 ">
          <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
            <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 flex justify-between px-4 md:px-0">
                <div className="flex-1 flex">
                  <div className="w-full flex md:ml-0">
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="dashboard" element={<Home />}></Route>
                        {/* <Route
                          path="folders/:folder"
                          element={<Folders />}
                        ></Route> */}
                        <Route
                          path="folders/:page"
                          element={<Folders />}
                        ></Route>
                      </Routes>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                </div>
              </div>
            </div>

            {/* <main className="flex-1">
              <div className="py-6">
                <div className="px-4 sm:px-6 md:px-0">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Dashboard
                  </h1>
                </div>
                <div className="px-4 sm:px-6 md:px-0">
                  <div className="py-4">
                    <Routes>
                      <Route path="/" element={<Home />}></Route>
                      <Route path="/dashboard" element={<Home />}></Route>
                    </Routes>
                    <div className="h-96 border-4 border-dashed border-gray-200 rounded-lg" />
                  </div>
                </div>
              </div>
            </main> */}
          </div>
        </div>
      </div>
    </>
  );
}
