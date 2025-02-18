"use client";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { FaSearch, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { fetchUsers } from "@/services/api";

const UserList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearch = useCallback(
    debounce((query:string) => setDebouncedSearch(query), 700),
    []
  );

  useEffect(() => {
    setPage(1);
    handleSearch(search);
  }, [search, handleSearch]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page, debouncedSearch],
    queryFn: () => fetchUsers(page, debouncedSearch),
  });

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center border p-2 rounded-md">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          className="ml-2 w-full p-1 outline-none text-black"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center my-4">
          <FaSpinner className="animate-spin text-blue-500 text-2xl" />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center my-4 text-red-500">
          <FaExclamationTriangle className="mr-2" />
          <span>Failed to fetch users. Try again later.</span>
        </div>
      )}

      <ul className="mt-4">
        {data?.data.map((user: any) => (
          <li key={user.id} className="p-3 border-b flex justify-between">
            <span className="text-black">{user.name}</span>
            <span className="text-gray-500">{user.email}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mt-4 text-black">
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded-md disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>
          Page {page} of {data?.totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded-md disabled:opacity-50"
          disabled={page >= data?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
