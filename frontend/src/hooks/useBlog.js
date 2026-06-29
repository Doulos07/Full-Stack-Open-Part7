import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import blogService from "../services/blogs";
import NotificationContext from "../NotificationContext";

export const useBlog = () => {
  const { notify } = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const sortLikes = (a, b) => b.likes - a.likes;
  const sortData = (blogs) => {
    return blogs.sort(sortLikes);
  };

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    select: sortData,
    retry: 1,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      console.log("newBlog", newBlog);
      const blog = queryClient.getQueryData(["blogs"]);
      console.log("blog", blog);
      queryClient.setQueryData(["blogs"], blog.concat(newBlog));
      notify({
        message: `a new blog ${newBlog.title} by ${newBlog.author}`,
        type: "success",
      });
    },
    onError: (error) => {
      console.log(error);
      notify({
        message: error.response.data.error,
        type: "error",
      });
    },
  });

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addBlog: (blogData) => newBlogMutation.mutate(blogData),
  };
};
