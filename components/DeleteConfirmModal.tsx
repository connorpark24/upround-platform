interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow">
        <h2>Are you sure you want to delete?</h2>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 rounded-md px-3.5 py-1.5"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-white bg-red-500 rounded-md px-3.5 py-1.5"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
