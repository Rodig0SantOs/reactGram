import "./Photo.css";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import Message from "../../components/Message/Message";

// Redux
import { getPhoto, like, comment } from "../../slices/photoSlice";
import { LikeContainer } from "../../components/Like/LikeContainer";

import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { uploads } from "../../utils/config";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  // comments
  const [commentText, setCommentText] = useState("");

  // load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // insert a like
  const handleLike = () => {
    console.log("Liking photo with id:", photo._id);
    dispatch(like(photo._id));
    resetMessage();
  };

  // Insert a comment
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));
    setCommentText("");
    resetMessage();
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  console.log("ID da foto:", id);

  return (
    <div id="photo">
      <PhotoItem photo={photo} />

      {/* Likes */}
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários ({photo.comments.length}):</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira seu comentário..."
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários</p>}
            {photo.comments.map((comment) => (
              <div className="comments" key={comment.comment}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
