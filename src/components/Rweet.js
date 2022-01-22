import React, { useState } from "react";
import { dbService, storageService } from "./../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Rweet = ({ rweetObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newRweet, setNewRweet] = useState(rweetObj.text);
  const [like, setLike] = useState(rweetObj.rweetLike);

  const onDeleteClick = async () => {
    const ok = window.confirm("키윗을 삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`rweets/${rweetObj.id}`).delete();
      await storageService.refFromURL(rweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`rweets/${rweetObj.id}`).update({
      text: newRweet,
    });
    setEditing(false); // for no more editing mode
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewRweet(value);
  };
  const onLikeClick = () => {
    setLike((rweetObj.rweetLike) = rweetObj.rweetLike + 1);
    console.log("hi");
  };
  const onLikeSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`rweets/${rweetObj.rweetLike}`).update({
      rweetLike: like,
    })
  }

  return (
    <div className="rweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container rweetEdit">
            <input
              type="text"
              placeholder="수정할 내용을 입력하세요."
              value={newRweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="키윗 업데이트" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            취소
          </button>
        </>
      ) : (
        <>
          <h4>{rweetObj.text}</h4>
          <h5>{rweetObj.creatorName}</h5>
          <h6>{rweetObj.createTime}</h6>
          {rweetObj.attachmentUrl && <img src={rweetObj.attachmentUrl} />}
          <button onClick={onLikeClick} onSubmit={onLikeSubmit}>Like {rweetObj.rweetLike}</button>
          {isOwner && (
            <div className="rweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Rweet;
