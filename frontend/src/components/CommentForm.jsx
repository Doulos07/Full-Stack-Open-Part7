import { useField } from "../hooks/index";
import { useBlog } from "../hooks/useBlog";
const CommentForm = ({ blogId }) => {
  const [comment, commentReset] = useField("text");
  const { commentBlog } = useBlog();

  const handleSubmit = (event) => {
    event.preventDefault();
    commentBlog({ id: blogId, comment: comment.value });
    commentReset();
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "10px" }}>
      <input {...comment} />
      <button style={{ marginLeft: "10px" }} type="submit">
        add cooment
      </button>
    </form>
  );
};

export default CommentForm;
