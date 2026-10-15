import { useEffect } from "react";
import userProfileStore from "../store/UserProfileStore";

const AuthInitializer = () => {
  const fetchMe = userProfileStore((state) => state.fetchMe);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return null;
};

export default AuthInitializer;
