import React from "react";
import { User, Eye, MessageCircle, ArrowRight } from "lucide-react";

const BlogCard = ({
  title = "Untitled Blog",
  author,
  views = 0,
  content = "",
  featuredImage,
  excerpt,
}) => {
  const getReadingTime = (text = "") => {
    const wordsPerMinute = 200;
    const words = text?.trim()?.split(/\s+/).length || 0;
    return `${Math.max(1, Math.ceil(words / wordsPerMinute))} min read`;
  };
  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 w-80 h-110 flex flex-col">
      <div className="relative h-34 md:h-48 overflow-hidden shrink-0">
        <img
          src={featuredImage || "/placeholder.jpg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
          {getReadingTime(content)}
        </span>
      </div>

      <div className="p-2 sm:p-4 flex flex-col flex-1">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
          {title}
        </h3>

        <p className="mt-2 text-sm line-clamp-4">{content}</p>

        {excerpt && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {excerpt}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <User size={16} />
          <span>{author?.name || "Anonymous"}</span>
        </div>

        <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {views}
            </span>
          </div>

          <button className="flex items-center gap-1 text-indigo-600 font-medium hover:underline">
            Read more <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
