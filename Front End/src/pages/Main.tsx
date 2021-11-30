import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import NewUserForm from "../NewUserForm/NewUserForm";
import User from "../UserForm/User";
import { setTld } from "../store";
import { useDispatch } from "react-redux";
import classes from "./Main.module.css";
const Main: React.FC<{}> = (props) => {
  const { sendRequest: fetchTasks } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    const transformData = (data: any) => {
      dispatch(setTld(data));
    };

    fetchTasks(
      {
        url: "https://raw.githubusercontent.com/incognico/list-of-top-level-domains/master/formats/json/tld-list.json",
      },
      transformData
    );
  }, [fetchTasks, dispatch]);

  return (
      <div className={classes.main}>
        <User />
        <NewUserForm />
      </div>
  );
};

export default Main;
