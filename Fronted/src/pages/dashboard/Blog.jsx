import React, { useEffect, useState } from "react";
import { getUserData } from "../../auth/useAuth";
import axios from "axios";
import BlogCard from "../../components/blogcard";
import Button from "../../components/ul/Button";

const Blog = () => {
  const username = getUserData();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/posts/user/my-posts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setData(res.data?.data?.posts || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setData([]); // prevent crash
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data.length) {
    return <p className="text-center">No blogs found</p>;
  }

  return (
    <div className="">
      <div className="flex justify-centercmb-4 sm:mb-6">
        <div className="w-full">
          <div className=" rounded-lg flex justify-between p-2">
            <h1 className="text-xl font-bold">My Blogs</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {data.map((post) => (
          <BlogCard
            key={post._id}
            title={post.title}
            author={{ name: username }}
            views={post.views}
            content={post.content}
            featuredImage={post.featuredImage}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
