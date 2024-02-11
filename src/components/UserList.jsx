import { useEffect, useState } from "react";
import Loading from "./Loading";
import UserDetail from "./UserDetail";

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
      <h1 className="text-2xl text-center font-bold mb-8">
        User List Application
      </h1>

      {/* search bar */}
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center justify-center bg-white rounded-lg p-1 sm:max-w-md sm:mx-auto"
        >
          <input
            type="text"
            placeholder="Search user"
            className="text-gray-500 w-full p-2 outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="p-2 px-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 duration-150 outline-none shadow-md focus:shadow-none sm:px-4">
            Search
          </button>
        </form>
      </div>

      {/* sort */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Sort: </span>
        <select
          className="select select-bordered w-full max-w-xs"
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

      {/* user lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <UserDetail key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
};

export default UserList;
