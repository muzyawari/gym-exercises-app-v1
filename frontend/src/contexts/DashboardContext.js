import React, { useState, useEffect, createContext } from "react";

const DashboardContext = createContext();

function DashboardProvider({ children }) {
  const [folders, setFolders] = useState([]);

  // const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch("/api/folders/");
      const jsonData = await response.json();

      if (response.ok) {
        setFolders(jsonData);
      }
    };

    fetchFolders();
  }, []);

  // useEffect(() => {
  //   const fetchPages = async () => {
  //     const response = await fetch("/api/pages/");
  //     const jsonData = await response.json();

  //     if (response.ok) {
  //       setPages(jsonData);
  //     }
  //   };

  //   fetchPages();
  // }, []);

  const addFolder = async (item) => {
    try {
      const response = await fetch(`/api/folders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item,
          pages: [],
        }),
      });
      const jsonData = await response.json();
      setFolders([...folders, jsonData]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const postPageName = async (pageItem, folderId) => {
    try {
      const response = await fetch(`/api/pages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: pageItem,
          folder: folderId,
        }),
      });
      const jsonData = await response.json();
      // setPages([...pages, jsonData]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const value = {
    folders,
    setFolders,
    addFolder,
    // pages,
    // setPages,
    postPageName,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export { DashboardContext, DashboardProvider };
