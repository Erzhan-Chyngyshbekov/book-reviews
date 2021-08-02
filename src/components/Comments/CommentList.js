// import React from "react";

// export default function Comments() {
//   return (
//     <form onSubmit={handleCommentAdd} className={classes.comments}>
//       <div>
//         {productDetail.comments.map((comment) => (
//           <div className={classes.comment} key={comment.id}>
//             <p>{comment.body}</p>
//             <p>{comment.owner}</p>
//             <HighlightOffIcon
//               onClick={() => handleDelete(comment.id, comment.owner)}
//             />
//           </div>
//         ))}
//       </div>
//       <input
//         name="comment"
//         onChange={(e) => setTitle(e.target.value)}
//         type="text"
//         required
//         value={title}
//         // value={title}
//       />
//       <button>create</button>
//     </form>
//   );
// }
