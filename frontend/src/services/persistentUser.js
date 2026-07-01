const KEY = "loggedBlogappUser";

const getUser = () => {
  const logged = globalThis.localStorage.getItem(KEY);
  return logged ? JSON.parse(logged) : null;
};

const saveUser = (user) => {
  globalThis.localStorage.setItem(KEY, JSON.stringify(user));
};

const removeUser = () => {
  globalThis.localStorage.removeItem(KEY);
};

export default { getUser, saveUser, removeUser };
