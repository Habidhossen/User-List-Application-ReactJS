import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
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
      <img
        src={image}
        alt={firstName}
        className="border rounded-md px-4 pt-4"
      />
      <div className="mt-6">
        <Link to={`user-detail/${id}`}>
          <h1 className="text-lg font-semibold">
            {firstName + " " + lastName}
          </h1>
        </Link>
        <p>Email: {email}</p>
        <p>Address: {address + ", " + city}</p>
        <p>Company Name: {name}</p>
      </div>
    </div>
  );
};

export default UserCard;
