import React, { useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import "../css/App.css";
import Loading from "./Loading";
import UserList from "./UserList";

// Define types for User and ApiResponse
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  data: User[];
  page: number;
  total_pages: number;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
    threshold: 0,
  });

  // Simulate initial loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Fetch users from API with explicit parameter type
  const fetchUsers = async (page: number): Promise<ApiResponse> => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );
    return response.data;
  };

  // Load users on mount and when "loadMoreInView" changes
  useEffect(() => {
    if (!isLoading && hasMore) {
      fetchUsers(page).then((data) => {
        setUsers((prevUsers) => [...prevUsers, ...data.data]);
        if (data.page >= data.total_pages) {
          setHasMore(false); // No more pages to load
        } else {
          setPage(page + 1); // Increment page for next load
        }
      });
    }
  }, [isLoading, page, loadMoreInView, hasMore]);

  return (
    <div className="App">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="content">
          <UserList users={users} />
          {hasMore && (
            <div ref={loadMoreRef} className="load-more">
              Loading more...
            </div>
          )}
          {!hasMore && <div className="end-of-list">No more users to load</div>}
        </div>
      )}
    </div>
  );
}

export default App;
