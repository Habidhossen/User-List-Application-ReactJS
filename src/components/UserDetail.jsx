import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const UserDetail = () => {
  const { userId } = useParams();

  // declare state for handling fetch data
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  // fetch function
  const fetchData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${userId}`);

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

  // if is loading
  if (isLoading) {
    return <Loading />;
  }

  // if is error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm">
      <img
        src={data?.image}
        alt={data?.firstName}
        className="h-96 w-96 px-4 pt-4"
      />
      <div className="mt-6">
        <h1 className="text-lg font-semibold">
          {data?.firstName + " " + data?.lastName}
        </h1>
        <p>Email: {data?.email}</p>
        <p>Address: {data?.address?.address + ", " + data?.address?.city}</p>
        <p>Company Name: {data?.company?.name}</p>
      </div>
    </div>
  );
};

export default UserDetail;
