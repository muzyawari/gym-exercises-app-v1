import { useState, useContext, useEffect } from "react";
import { NavLink, Link, useLocation, useParams } from "react-router-dom";

import {
  FolderIcon,
  DocumentAddIcon,
  FolderAddIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  XIcon,
  DocumentTextIcon,
  FolderOpenIcon,
} from "@heroicons/react/outline";

import { DashboardContext } from "../../../contexts/DashboardContext";

const FoldersSidebar = () => {
  const { folders, setFolders, addFolder, postPageName, getFolderPages } =
    useContext(DashboardContext);

  const [pages, setPages] = useState([]);

  const [folderName, setFolderName] = useState("");
  const [openInput, setOpenInput] = useState(false);

  const [open, setOpen] = useState(false);

  const [pageName, setPageName] = useState("");
  const [openPageInput, setOpenPageInput] = useState(null);

  const handleFolderAdd = () => {
    if (!folderName) return;
    addFolder(folderName);
    setFolderName("");
    setOpenInput(!openInput);
  };

  const fetchPagesWithFolderId = async (id) => {
    try {
      const response = await fetch(`/api/pages/${id}`);

      const jsonData = await response.json();

      setPages(jsonData);
      setOpen(!open);
    } catch (err) {}
  };

  const handlePageAdd = (pageName, folderId) => {
    if (!pageName) return;
    postPageName(pageName, folderId);
    setPageName("");
    setOpenPageInput(!openPageInput);

    window.location.reload();
  };

  const handlePageState = (id) => {
    setOpenPageInput((oldID) => (oldID === id ? null : id));
  };

  const stringWhiteSpace = (value) => {
    if (value !== null) {
      return value.indexOf(" ") >= 0;
    }
  };

  return (
    <div>
      <p className="group cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-700 group rounded-md py-2 px-2 flex items-center text-sm font-medium">
        <FolderIcon
          className="text-gray-500 mr-3 flex-shrink-0 h-6 w-6 group-hover:text-gray-500"
          aria-hidden="true"
        />
        Folders
        <FolderAddIcon
          className="h-5 w-5 invisible hover:bg-gray-300 hover:rounded-md group-hover:visible flex-shrink-0  ml-24  text-gray-400"
          onClick={() => setOpenInput(!openInput)}
        />
      </p>
      {openInput && (
        <div className="mt-2 flex rounded-md shadow-sm ml-2">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md  sm:text-sm  text-zinc-700 border-gray-200"
              placeholder="Add Folder"
            />
          </div>
          <button
            type="submit"
            className="-ml-px  relative inline-flex items-center space-x-2 px-1 py-2 border border-gray-100 text-gray-400  text-sm font-medium rounded-md   hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={handleFolderAdd}
          >
            <CheckIcon className="h-5 w-5  text-gray-400" aria-hidden="true" />
          </button>
          <button
            onClick={() => {
              setFolderName("");
              setOpenInput(!openInput);
            }}
            className="-ml-px  relative inline-flex items-center space-x-2 px-1 py-2 border border-gray-100 text-gray-400  text-sm font-medium rounded-md   hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <XIcon className="h-5 w-5  text-gray-400" aria-hidden="true" />
          </button>
        </div>
      )}
      {folders.map((folder) => (
        <div key={folder._id}>
          <div className="group cursor-pointer mt-2 text-gray-600 pl-2 hover:bg-gray-50 h-8 hover:text-gray-700 group rounded-md  flex items-center text-sm font-medium">
            <div className="flex-none">
              <FolderOpenIcon
                className="text-gray-500 mr-3 flex-shrink-0 h-6 w-6 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </div>
            <p>{folder.title}</p>

            <DocumentAddIcon
              className="h-5 w-5 invisible hover:bg-gray-300 hover:rounded-md group-hover:visible flex-shrink-0 ml-12 text-gray-400"
              onClick={() => handlePageState(folder._id)}
            />
          </div>
          {folder._id === openPageInput && (
            <div className="mt-2 flex rounded-md shadow-sm ml-2">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <input
                  type="text"
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md  sm:text-sm  text-zinc-700 border-gray-200"
                  placeholder="Add Page"
                />
              </div>
              <button
                type="submit"
                className="-ml-px  relative inline-flex items-center space-x-2 px-1 py-2 border border-gray-100 text-gray-400  text-sm font-medium rounded-md   hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <CheckIcon
                  onClick={() => {
                    handlePageAdd(pageName, folder._id);
                  }}
                  className="h-5 w-5  text-gray-400"
                  aria-hidden="true"
                />
              </button>
              <button className="-ml-px  relative inline-flex items-center space-x-2 px-1 py-2 border border-gray-100 text-gray-400  text-sm font-medium rounded-md   hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                <XIcon
                  className="h-5 w-5  text-gray-400"
                  aria-hidden="true"
                  onClick={() => {
                    setPageName("");
                    setOpenPageInput(!openPageInput);
                  }}
                />
              </button>
            </div>
          )}
          {folder.pages.map((page) => (
            <Link
              key={page._id}
              reloadDocument
              to={`/folders/${page._id}`}
              className="group cursor-pointer mt-2 text-gray-600 pl-4 hover:bg-gray-50 h-8 hover:text-gray-700 group rounded-md  flex items-center text-sm font-medium"
            >
              <div className="flex-none">
                <DocumentTextIcon
                  className="text-gray-500 mr-3 flex-shrink-0 h-6 w-6 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </div>
              {/* {stringWhiteSpace(page.title) ? (
                <Link to={`/folders/${page.title.replace(/\s/g, "")}`}>
                  {page.title}
                </Link>
              ) : (
                <Link to={`/pages/${page.title}`}>{page.title}</Link>
              )} */}

              <p>{page.title}</p>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FoldersSidebar;
