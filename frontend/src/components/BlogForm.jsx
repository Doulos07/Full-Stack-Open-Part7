import { useField } from "../hooks";

const BlogForm = ({ newBlog }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleSubmit = (event) => {
    event.preventDefault();
    newBlog({ title: title.value, author: author.value, url: url.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="blog-form">
        <div>
          <label htmlFor="title"> title</label>
          <input id="title" {...title} />
        </div>
        <div>
          <label htmlFor="author"> author</label>
          <input id="author" {...author} />
        </div>
        <div>
          <label htmlFor="url"> url</label>
          <input id="url" {...url} />
        </div>
        <button className="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
