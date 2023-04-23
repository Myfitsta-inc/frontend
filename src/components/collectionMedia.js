import React from "react";
import usePost from "hooks/usePost";
import apiUrl from "apiUrl/url";
const CollectionMedia = ({ postId }) => {
  const { post } = usePost(postId);
  const mediaUrl = post && post.mediaDetails[0].key;
  return (
    <div className="box-media-show">
      {post ? (
        post.mediaDetails[0].mimetype.includes("image") ? (
          <img src={`${apiUrl.content}${mediaUrl}`} loading="lazy" />
        ) : (
          <video>
            <source src={`${apiUrl.content}${mediaUrl}`} />
          </video>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default CollectionMedia;

// <div className="box-media-show">
//   {post.data[0] ? (
//     post.data[0].fileType.includes(
//       "image"
//     ) ? (
//       <img
//         src={`${apiUrl.content}${
//           post.data[0].file.split(",")[0]
//         }`}
//       />
//     ) : (
//       <video>
//         <source
//           src={`${apiUrl.content}${
//             post.data[0].file.split(",")[0]
//           }`}
//         />
//       </video>
//     )
//   ) : (
//     ""
//   )}
// </div>
// <div className="box-media-show">
//   {post.data[1] ? (
//     post.data[1].fileType.includes(
//       "image"
//     ) ? (
//       <img
//         src={`${apiUrl.content}${
//           post.data[1].file.split(",")[0]
//         }`}
//       />
//     ) : (
//       <video>
//         <source
//           src={`${apiUrl.content}${
//             post.data[1].file.split(",")[0]
//           }`}
//         />
//       </video>
//     )
//   ) : (
//     ""
//   )}
// </div>
// <div className="box-media-show">
//   {post.data[2] ? (
//     post.data[2].fileType.includes(
//       "image"
//     ) ? (
//       <img
//         src={`${apiUrl.content}${
//           post.data[2].file.split(",")[0]
//         }`}
//       />
//     ) : (
//       <video>
//         <source
//           src={`${apiUrl.content}${
//             post.data[2].file.split(",")[0]
//           }`}
//         />
//       </video>
//     )
//   ) : (
//     ""
//   )}
// </div>
// <div className="box-media-show">
//   {post.data[3] ? (
//     post.data[3].fileType.includes(
//       "image"
//     ) ? (
//       <img
//         src={`${apiUrl.content}${
//           post.data[3].file.split(",")[0]
//         }`}
//       />
//     ) : (
//       <video>
//         <source
//           src={`${apiUrl.content}${
//             post.data[3].file.split(",")[0]
//           }`}
//         />
//       </video>
//     )
//   ) : (
//     ""
//   )}
// </div>
