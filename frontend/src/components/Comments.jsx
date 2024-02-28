import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { RatesStyle } from "../pages/AllPages";
import useRequest from "../hooks/useRequest";
import { useAuthorization } from "../contexts/AuthorizationContext";

const Comments = ({ comments, resendRequest }) => {
  const { t } = useTranslation();
  const [showComment, setShowComment] = useState(2);
  const [hideComment, setHideComment] = useState(false);
  const [commentMenu, setCommentMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const edittedComment = useRef(null);
  const { productId } = useParams();
  const { userName } = useAuthorization();

  const { sendRequest } = useRequest({
    method: "DELETE",
    envVariable: "REACT_APP_COMMENTS",
  });

  const { sendRequest: sendRequestForEdit } = useRequest({
    method: "PUT",
    envVariable: "REACT_APP_COMMENTS",
  });

  const commentsList =
    comments?.items.map((comment) => {
      return {
        text: comment.userComment,
        userName: comment.userName,
        id: comment._uuid,
        productId: comment.productId,
      };
    }) || [];

  const filteredComments = commentsList.filter(
    (comment) => comment.productId === productId
  );

  const showMoreComments = () => {
    setShowComment((prev) => prev + 5);
    setHideComment(true);
  };

  const hideAllComments = () => {
    setShowComment(2);
    setHideComment(false);
  };

  const deleteComment = (id) => {
    sendRequest(null, `https://crudapi.co.uk/api/v1/comments/${id}`)
      .then(() => {
        resendRequest();
      })
      .catch((err) => console.log(err));

    setCommentMenu(false);
  };

  const onSubmit = (e, id) => {
    e.preventDefault();
    if (edittedComment.current) {
      const comm = edittedComment.current.value;
      sendRequestForEdit(
        { userComment: comm },
        `https://crudapi.co.uk/api/v1/comments/${id}`
      )
        .then(() => {
          resendRequest();
        })
        .catch((err) => console.log(err));
    }

    setEditMode(false);
  };
  return (
    <RatesStyle>
      <div className="commentSection">
        {filteredComments.slice(0, showComment).map((comment, index) => (
          <div className="comments" key={comment.id}>
            <div className="comment-sub-section">
              <h2>{comment.userName}</h2>
              <p>{comment.text}</p>
              {editMode && comment.id === editingCommentId && (
                <form onSubmit={(e) => onSubmit(e, comment.id)}>
                  <textarea
                    name="commentEdit"
                    id={`commentEdit${index}`}
                    defaultValue={comment.text}
                    ref={edittedComment}
                  />
                  <button type="submit">{t("Send")}</button>
                </form>
              )}
            </div>
            {userName === comment.userName && (
              <div>
                <div>
                  <FontAwesomeIcon
                    onClick={() => {
                      setCommentMenu((prevState) => !prevState);
                      setEditingCommentId(comment.id);
                    }}
                    icon={faEllipsisVertical}
                  />
                </div>
                {commentMenu && comment.id === editingCommentId && (
                  <div className="comment-menu">
                    <span onClick={() => deleteComment(comment.id)}>
                      {t("delete")}
                    </span>
                    <span
                      onClick={() => {
                        setEditMode((prevState) => !prevState);
                        setCommentMenu(false);
                      }}
                    >
                      {t("edit")}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {filteredComments.length > 2 && (
          <div className="showComments">
            <Link className="viewMore" onClick={showMoreComments}>
              {t("View more")}
              <FontAwesomeIcon icon={faChevronDown} />
            </Link>
            {hideComment && (
              <Link className="viewMore" onClick={hideAllComments}>
                {t("Hide all")}
                <FontAwesomeIcon icon={faChevronUp} />
              </Link>
            )}
          </div>
        )}
      </div>
    </RatesStyle>
  );
};

export default Comments;
