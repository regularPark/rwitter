import React, { useState } from "react";
import { dbService, storageService } from "./../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Rweet = ({ rweetObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newRweet, setNewRweet] = useState(rweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this rweet?");
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
  return (
    <div className="rweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container rweetEdit">
            <input
              type="text"
              placeholder="Edit your Rweet"
              value={newRweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Rweet" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{rweetObj.text}</h4>
          <h5>{userObj.displayName}</h5>
          <h6>{rweetObj.createTime}</h6>
          {rweetObj.attachmentUrl && <img src={rweetObj.attachmentUrl} />}
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
