import { useEffect, useState } from "react";
import UserDetail from "./UserDetail";

const UserList = () => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <h1 className="text-2xl text-center font-bold mb-8">
        User List Application
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.users.map((user) => (
          <UserDetail key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
};

export default UserList;
