"use client";
import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import PostForm from "@/components/PostForm";
import Button from "@/components/Button";
import useSupabase from "@/hooks/useSupabase";
import { createSupabaseBrowserClient } from "@/utils/supabaseBrowserClient";
import { Post } from "@/utils/types";

export default function Dashboard() {
  const { user } = useSupabase();
  const supabase = createSupabaseBrowserClient();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    description: "",
    link_to_resource: "",
    author: 1,
  });
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
    };
    fetchPosts();
  });

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPost) return;

    const { data, error } = await supabase.from("posts").insert([newPost]);

    if (error) {
      console.error("There was an error inserting the data", error);
      return;
    }

    if (data) {
      setPosts((currentPosts) => [...currentPosts, ...data]);
    }

    setNewPost({
      id: 1,
      title: "",
      description: "",
      link_to_resource: "",
      author: 1,
    });

    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Dashboard" />
      <div className="px-8 py-4 flex flex-row">
        <div className="w-3/5 pr-8">
          <div className="flex flex-row justify-between items-center mb-4 h-8">
            <p className="text-xl">Posts</p>
            <Button
              text={"Post"}
              onClick={() => setIsModalOpen(true)}
              icon={<PlusIcon className="w-8 h-8" />}
            />
          </div>
          <Modal isOpen={isModalOpen}>
            <PostForm
              newPost={newPost}
              setNewPost={setNewPost}
              onSubmit={handleAddPost}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
          <div className="flex flex-col gap-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="w-2/5">
          <div className="flex flex-row justify-between items-center mb-4 h-8">
            <p className="text-xl">Upcoming Events</p>
          </div>
          <EventCard />
        </div>
      </div>
    </div>
  );
}

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  return (
    <div className="w-full h-32 rounded-md border-[1px] border-gray-200 p-4">
      <p className="text-lg">{post.title}</p>
      <p className="text-sm">{post.author}</p>
      <p className="text-sm">{post.description}</p>
    </div>
  );
}

function EventCard() {
  return (
    <div className="w-full h-32 rounded-md border-[1px] border-gray-200 p-4">
      <p>Title</p>
      <p>Description</p>
    </div>
  );
}
