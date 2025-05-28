import React, { useEffect, useState } from "react";
import Redirect from "./Redirect";
import axios from "axios";
import useJoinjoyStore from "../global-store/joinjoy-store";

const ProtectRouteAdmin = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useJoinjoyStore((state) => state.user);
  const token = useJoinjoyStore((state) => state.token);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (user && token) {
          const res = await axios.get(
            "http://localhost:3000/api/me",
            {
              headers: {
                Authorization:`Bearer ${token}`,
              },
            }
          );
          if (res.data.user.role === "admin") {
            setOk(true);
          } else {
            setOk(false);
          }
        } else {
          setOk(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setOk(false);
      }
    };
    checkAdmin();
  }, []);

  if (ok === null) return <div>Loading...</div>;

  return ok ? element : <Redirect />;
};

export default ProtectRouteAdmin;
