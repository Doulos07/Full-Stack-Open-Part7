import { useField } from "../hooks";

const BlogForm = ({ newBlog }) => {
  // const [title, setTitle] = useState('')
  const [title, titleReset] = useField("text");
  const [author, authorReset] = useField("text");
  const [url, urlReset] = useField("text");

  const handleSubmit = (event) => {
    event.preventDefault();
    newBlog({ title: title.value, author: author.value, url: url.value });
  };

  const handleReset = () => {
    titleReset();
    authorReset();
    urlReset();
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
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
