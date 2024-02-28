import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../../hooks/useFetch";
import { UsersChart } from "../../pages/AllPages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { LoadingDiv } from "../../components/components";

const UserData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { fetchRequest, loading } = useFetch({
    url: "https://crudapi.co.uk/api/v1/users",
    method: "GET",
    envVariable: "REACT_APP_USERS",
  });

  const users = fetchRequest?.items.map((user) => ({
    Email: user.Email,
    email: user.email,
    UName: user.UName,
    FName: user.FName,
    id: user._uuid,
  }));

  if (loading)
    return (
      <LoadingDiv style={{ left: "50%" }}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </LoadingDiv>
    );

  return (
    <UsersChart>
      <FontAwesomeIcon
        size="xl"
        style={{ position: "absolute" }}
        onClick={() => navigate(-1)}
        icon={faChevronLeft}
      />
      <h1>{t("user data")}</h1>
      {users?.map((user) => (
        <div className="users" key={user.id}>
          {user.email && (
            <div className="user-row">
              <h2>{user.email}</h2>
              <h2>{t("subscription")}</h2>
            </div>
          )}
          {user.Email && (
            <div className="user-row">
              <div className="user-row-elements">
                <h2>{user.UName}</h2>
                <h2>{user.Email}</h2>
                <h2>{user.FName}</h2>
              </div>
              <h2>{t("registration")}</h2>
            </div>
          )}
        </div>
      ))}
    </UsersChart>
  );
};

export default UserData;
