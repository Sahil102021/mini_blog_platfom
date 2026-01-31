import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../components/ul/Input";
import Button from "../../components/ul/Button";
import { getToken } from "../../auth/useAuth";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: null, 
  });

  const token = getToken();
  const API = import.meta.env.VITE_BACKEND_API_URL;

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API}/api/posts/user/my-posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data?.data?.posts || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      featuredImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);

      if (form.featuredImage) {
        formData.append("featuredImage", form.featuredImage);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (isEdit) {
        await axios.put(`${API}/api/posts/${currentId}`, formData, config);
      } else {
        await axios.post(`${API}/api/posts`, formData, config);
      }

      closeModal();
      fetchBlogs();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    await axios.delete(`${API}/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBlogs();
  };

  const openEditModal = (blog) => {
    setIsEdit(true);
    setCurrentId(blog._id);
    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      featuredImage: null,
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setIsEdit(false);
    setCurrentId(null);
    setForm({
      title: "",
      excerpt: "",
      content: "",
      featuredImage: null,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEdit(false);
    setCurrentId(null);
    setForm({
      title: "",
      excerpt: "",
      content: "",
      featuredImage: null,
    });
  };

  return (
    <div className="space-y-3 md:space-y-6 min-h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Blog Management</h1>
        <Button className="max-w-40" onClick={openCreateModal}>
          Create New Blog
        </Button>
      </div>

      <div className="w-full rounded-lg border overflow-x-auto">
        <table className="min-w-md w-full border-collapse overflow-x-scroll">
          <thead className=" bg-(--gray) text-(--blue) text-sm">
            <tr>
              <th className="p-2 md:px-4 md:py-3 text-left border-b">Title</th>
              <th className="p-2 md:px-4 md:py-3 text-left border-b">
                Content
              </th>
              <th className="p-2 md:px-4 md:py-3 text-left border-b">
                Excerpt
              </th>
              <th className="p-2 md:px-4 md:py-3text-left border-b">Photo</th>
              <th className="p-2 md:px-4 md:py-3 text-center border-b">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-(--gray) transition">
                <td className="p-1 md:px-4 md:py-3 border-b font-medium">
                  <p className=" line-clamp-1 ">{blog.title}</p>
                </td>
                <td className="p-1 md:px-4 md:py-3 border-b font-medium">
                  <p className=" line-clamp-2 ">{blog.content}</p>
                </td>
                <td className="p-1 md:px-4 md:py-3 border-b font-medium">
                  <p className=" line-clamp-2 ">{blog.excerpt}</p>
                </td>
                <td className="p-1 md:px-4 md:py-3 border-b">
                  <div className="w-full flex items-center justify-center">
                    <img src={blog.featuredImage} className="w-10 h-10" />
                  </div>
                </td>
                <td className="p-1 md:px-4 md:py-3 border-b">
                  <div className="flex justify-center gap-2">
                    <Button
                      className="max-w-20 px-2"
                      onClick={() => openEditModal(blog)}
                    >
                      Update
                    </Button>
                    <Button
                      className="max-w-20 px-2 bg-red-600 rounded hover:bg-(--blue) text-white"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {blogs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No posts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-(--white) rounded-lg shadow-lg w-full max-w-xs md:max-w-lg p-2 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {isEdit ? "Update Blog" : "Create Blog"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="pl-1! pr-1!"
                  placeholder="title"
                  
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Excerpt
                </label>
                <Input
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  className={"pl-1! pr-1!"}
                  placeholder="excerpt"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Featured Image
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={"pl-1! pr-1!"}
                  placeholder="photo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                  minLength={20}
                  className="w-full h-32 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Content must be at least 10 words long."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <Button type="submit" isLoading={loading}>
                  {isEdit ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
