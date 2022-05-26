import { Link } from "@remix-run/react";

const AdminIndex = () => {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  );
};

export default AdminIndex;
