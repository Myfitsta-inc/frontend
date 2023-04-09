import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
function usePost(postId) {
  const [post, setPost] = useState(null);
  const allPost = useSelector((state) => state.postList);
  const dispatch = useDispatch();

  useEffect(() => {
    const post = allPost.find((post) => post._id === postId);
    if (post) {
      setPost(post);
    } else {
      const loadPost = async () => {
        let found = allPost.find((item) => item._id === postId);
        if (found) {
          setPost(found.mediaDetails[0]);
        } else {
          const { data } = await axios.get(`/api/imageinfo/${postId}`, {
            withCredentials: true,
          });
          dispatch({ type: "UPDATE_POSTIST", value: [...allPost, data] });
          setPost(data);
        }
      };
      if (postId) {
        loadPost();
      }
    }
  }, []);

  return {
    post,
  };
}
export default usePost;
