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
    <div>
      {data?.users.map((user) => (
        <UserDetail key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
