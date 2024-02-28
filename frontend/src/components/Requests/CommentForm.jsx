import React, { useRef } from "react";
import { RatesStyle } from "../../pages/AllPages";
import { SubmitButton } from "../components";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCheck } from "@fortawesome/free-solid-svg-icons";
import useRequest from "../../hooks/useRequest";
import Comments from "../Comments";
import useFetch from "../../hooks/useFetch";
import { useAuthorization } from "../../contexts/AuthorizationContext";
import { useParams } from "react-router-dom";

const CommentForm = () => {
  const { t } = useTranslation();
  const commentRef = useRef(null);
  const {userName, userLoggedIn} = useAuthorization()
  const {productId} = useParams()

  const { sendRequest, loading, sentRequest } = useRequest({
    url: "https://crudapi.co.uk/api/v1/comments",
    method: "POST",
    envVariable: "REACT_APP_COMMENTS",
  });

  const { fetchRequest, resendRequest } = useFetch({
    url: "https://crudapi.co.uk/api/v1/comments",
    method: "GET",
    envVariable: "REACT_APP_COMMENTS",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const userComment = commentRef.current.value.trim();
    if (userComment === "") return;

    sendRequest([{ userComment, userName, productId }])
      .then(() => {
        commentRef.current.value = "";
      })
      .then(() => {
        resendRequest();
      })
      .catch((err) => console.log(err));
  };

  return (
    <RatesStyle>
      <h1>{t("Rates")}</h1>
      {userLoggedIn &&
      <form onSubmit={onSubmit}>
        <label htmlFor="Rates">{t("Rate the product")}</label>
        {userLoggedIn && 
        <textarea
          name="Rates"
          id="Rates"
          placeholder={t("Rate")}
          ref={commentRef}
        />
        }
        <div className="submitBtn">
          <SubmitButton type="submit">{t("Send")}</SubmitButton>
          {loading && (
            <FontAwesomeIcon className="icon" icon={faArrowsRotate} />
          )}
          {sentRequest && <FontAwesomeIcon icon={faCheck} />}
        </div>
      </form>
}
      <div className="commentSection">
        <Comments comments={fetchRequest} resendRequest={resendRequest}/>
      </div>
    </RatesStyle>
  );
};

export default CommentForm;
