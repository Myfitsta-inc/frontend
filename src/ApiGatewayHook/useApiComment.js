import axios from "axios";

function useApiComment() {}

class CommentApi {
  constructor(postId, userId) {
    this.postId = postId;
    this.userId = userId;
  }

  fetchComment = async (number) => {
    const { data } = await axios.get(
      `/api/commentonthis/${this.postId}/${number}`,
      {
        withCredentials: true,
      }
    );
    return data;
  };
}

export default { useApiComment, CommentApi };
