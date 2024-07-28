import { HomeIcon, UserCircleIcon, TableCellsIcon, InformationCircleIcon, ServerStackIcon, RectangleStackIcon, FolderMinusIcon } from "@heroicons/react/24/solid";
import { SignIn, SignUp } from "@/pages/auth";
import Home from "./pages/dashboard/Home";
// import { Profile } from "./pages/dashboard";
import Profile from "./pages/dashboard/profile";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <FolderMinusIcon {...icon} />,
        name: "Form",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
];

export default routes;
