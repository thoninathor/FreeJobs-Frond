import Home from "../page/Home";
import User from "../page/User";
import Users from "../page/Users";
import Restore from "../page/Restore";
import Error404 from "../page/Error404";


// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/users",
    exact: true,
    page: Users,
  },
  {
    path: "/:id",
    exact: true,
    page: User,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "/Restore",
    exact: true,
    page: Restore,
  },
  {
    path: "*",
    page: Error404,
  },
];
