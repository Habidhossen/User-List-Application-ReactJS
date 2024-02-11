import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  // destructure user object
  const {
    id,
    firstName,
    lastName,
    email,
    image,
    address: { address, city },
    company: { name },
  } = user;

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm">
      <img src={image} alt={firstName} className="px-4 pt-4" />
      <div className="mt-6">
        <Link to={`user-detail/${id}`}>
          <h1 className="text-lg font-semibold hover:text-purple-700 hover:underline duration-300">
            {firstName + " " + lastName}
          </h1>
        </Link>
        <p className="text-sm mt-2">Email: {email}</p>
        <p className="text-sm mt-1">Address: {address + ", " + city}</p>
        <p className="text-sm mt-1">Company Name: {name}</p>
      </div>
    </div>
  );
};

export default UserCard;
