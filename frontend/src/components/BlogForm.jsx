import "../styles/form.css";
import { useField } from "../hooks";
import { useBlog } from "../hooks/useBlog";

const BlogForm = () => {
  // const [title, setTitle] = useState('')
  const [title, titleReset] = useField("text");
  const [author, authorReset] = useField("text");
  const [url, urlReset] = useField("text");
  const { addBlog } = useBlog();

  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog({ title: title.value, author: author.value, url: url.value });
  };

  const handleReset = () => {
    titleReset();
    authorReset();
    urlReset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-content-input">
          <label htmlFor="title"> title</label>

          <input id="title" {...title} />
        </div>
        <div className="form-content-input">
          <label htmlFor="author"> author</label>

          <input id="author" {...author} />
        </div>
        <div className="form-content-input">
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
