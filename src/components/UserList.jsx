import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "./Loading";
import UserCard from "./UserCard";

const UserList = () => {
  // State for handling fetch data
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  // State for handling search and sort functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("");

  // State for handling new user data and modal state
  const [newUserData, setNewUserData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    companyName: "",
  });

  // Modal state
  const [modalState, setModalState] = useState(false);

  // Function to open modal
  const openModal = () => {
    setModalState(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalState(false);
  };

  // Function to fetch data from API
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

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Destructure state variables
  const { data, isLoading, error } = state;

  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle sort select change
  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  // Function to handle input change in the add new user form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle adding new user
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
    closeModal();
  };

  // Filter users based on search query
  let filteredUsers = data?.users;
  if (searchQuery) {
    filteredUsers = data?.users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }

  // Sort users based on sort type
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
          <h1 className="text-sm md:text-2xl lg:text-2xl text-center font-bold mb-8">
            User List Application
          </h1>
        </div>

        {/* add new user button */}
        <div>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-500 duration-300"
          >
            Add User
          </button>
        </div>
      </div>

      {/* add new user modal */}
      {modalState && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={closeModal}
          ></div>
          <div className="flex items-center min-h-screen">
            <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
              <div className="flex justify-end">
                <button
                  className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-4 pb-6 text-center">
                <h4 className="text-xl font-medium text-gray-800">
                  Add a new user
                </h4>

                <form onSubmit={handleAddUser} className="space-y-2 mt-6">
                  <input
                    className="w-full p-3 bg-gray-100 rounded-lg outline-purple-500"
                    type="text"
                    name="image"
                    placeholder="Image"
                    value={newUserData.image}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    className="w-full p-3 bg-gray-100 rounded-lg outline-purple-500"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={newUserData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    className="w-full p-3 bg-gray-100 rounded-lg outline-purple-500"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={newUserData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    className="w-full p-3 bg-gray-100 rounded-lg outline-purple-500"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUserData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    className="w-full p-3 bg-gray-100 rounded-lg outline-purple-500"
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={newUserData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    className="w-full p-3 bg-gray-100 rounded-lg outline-purple-500"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={newUserData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    className="w-full p-3 bg-gray-100 rounded-lg outline-purple-500"
                    type="text"
                    name="city"
                    placeholder="City"
                    value={newUserData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-500 duration-300"
                  >
                    Add User
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* sort and search */}
      <div className="flex flex-col md:flex-row lg:flex-row justify-center gap-4 mb-8">
        {/* sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Sort: </span>
          <select
            className="p-3 outline-none rounded-lg text-sm w-full"
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
            className="flex items-center justify-between bg-white rounded-lg p-1"
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
    </section>
  );
};

export default UserList;
