import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const UserDetail = () => {
  // Get user ID from URL parameters
  const { userId } = useParams();

  // declare state for handling fetch data
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  // Function to fetch user data from the API
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
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row lg:flex-row items-center gap-8 bg-white p-4 rounded-lg shadow-lg border ">
        <div>
          <img
            src={data?.image}
            alt={data?.firstName}
            className="h-96 w-96 px-4 pt-4"
          />
        </div>
        <div className="mt-6">
          <h1 className="text-purple-700 text-lg font-semibold">
            {data?.firstName + " " + data?.lastName}
          </h1>
          <p className="mt-1">Email: {data?.email}</p>
          <p className="mt-1">
            Address: {data?.address?.address + ", " + data?.address?.city}
          </p>
          <p className="mt-1">Company Name: {data?.company?.name}</p>
        </div>
      </div>
    </section>
  );
};

export default UserDetail;
