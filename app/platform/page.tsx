"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
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
    profiles: {
      full_name: "",
      avatar_url: "",
    },
  });

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
      *,
      profiles (
        full_name,
        avatar_url
      )
    `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      console.log(data);
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPost.title || !newPost.description) return;

    const { data, error } = await supabase
      .from("posts")
      .insert([{ ...newPost, author_id: user?.id }]);

    if (error) {
      console.error("There was an error inserting the data", error);
      return;
    }

    fetchPosts();
    setNewPost({
      title: "",
      description: "",
      link_to_resource: "",
      profiles: {
        full_name: "",
        avatar_url: "",
      },
    });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Dashboard" />
      <div className="px-8 py-4 flex flex-row">
        <div className="w-3/5 pr-8">
          <div className="flex flex-row justify-between items-center mb-4 h-8">
            <p className="text-xl font-medium">Posts</p>
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
          <div className="flex flex-col gap-y-6">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-2/5">
          <div className="flex flex-row justify-between items-center mb-4 h-8">
            <p className="text-xl font-medium">Upcoming Events</p>
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
  const initials = post.profiles?.full_name
    ?.split(" ")
    .map((name) => name.charAt(0))
    .join("");

  return (
    <div className="w-full">
      <div className="flex items-center space-x-3 mb-2">
        {post.profiles?.avatar_url ? (
          <Image
            src={post.profiles.avatar_url}
            alt="Author's avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            {initials}
          </div>
        )}

        <p className="text-sm font-medium">{post.profiles?.full_name}</p>
      </div>
      <p className="text-xl mb-2">{post.title}</p>
      <p className="text-sm text-gray-600">{post.description}</p>
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
