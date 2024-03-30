import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";
import { Post } from "@/utils/types";

type PostFormProps = {
  newPost: Post;
  setNewPost: React.Dispatch<React.SetStateAction<Post>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

const PostForm: React.FC<PostFormProps> = ({
  newPost,
  setNewPost,
  onSubmit,
  onClose,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <TextInput
            label="Title"
            id="title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
        </div>

        <div className="sm:col-span-6">
          <TextAreaInput
            label="Description"
            id="description"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
            rows={2}
          />
        </div>

        <div className="sm:col-span-6">
          <TextInput
            label="Link to Resource"
            id="link_to_resource"
            value={newPost.link_to_resource}
            onChange={(e) =>
              setNewPost({ ...newPost, link_to_resource: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-medium leading-6 text-gray-900"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white  hover:bg-blue-400 "
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default PostForm;
