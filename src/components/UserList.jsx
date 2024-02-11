import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "./Loading";
import UserCard from "./UserCard";

const UserList = () => {
  // declare state for handling fetch data
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  // declare state for handling search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("");

  const [newUserData, setNewUserData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    companyName: "",
  });

  // fetch function
  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();

      setState({
        data: responseData,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { data, isLoading, error } = state;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: uuidv4(),
      image: newUserData.image,
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
      company: {
        name: newUserData.companyName,
      },
      address: {
        address: newUserData.address,
        city: newUserData.city,
      },
    };
    setState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        users: [...prevState.data.users, newUser],
      },
    }));
    setNewUserData({
      image: "",
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      address: "",
      city: "",
    });
  };

  let filteredUsers = data?.users;

  if (searchQuery) {
    filteredUsers = data?.users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }

  if (sortType === "name") {
    filteredUsers.sort((a, b) =>
      (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName)
    );
  } else if (sortType === "email") {
    filteredUsers.sort((a, b) => a.email.localeCompare(b.email));
  } else if (sortType === "company") {
    filteredUsers.sort((a, b) => a.company.name.localeCompare(b.company.name));
  }

  // if is loading
  if (isLoading) {
    return <Loading />;
  }

  // if is error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      {/* title */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl text-center font-bold mb-8">
            User List Application
          </h1>
        </div>

        <div>
          <button className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-500 duration-300">
            Add User
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {/* sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Sort By: </span>
          <select
            className="p-3 outline-none rounded-lg text-sm "
            onChange={handleSort}
            value={sortType}
          >
            <option disabled selected>
              Select type
            </option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
          </select>
        </div>

        {/* search bar */}
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center justify-center bg-white rounded-lg p-1"
          >
            <input
              type="text"
              placeholder="Search user"
              className="text-gray-500 p-2 outline-none"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-500 duration-300">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* user lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* add new user */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Add New User</h2>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            name="image"
            placeholder="Image"
            value={newUserData.image}
            onChange={handleInputChange}
            required
          />{" "}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newUserData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newUserData.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUserData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={newUserData.companyName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newUserData.address}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newUserData.city}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className="p-2 px-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 duration-150 outline-none shadow-md focus:shadow-none sm:px-4"
          >
            Add User
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserList;
