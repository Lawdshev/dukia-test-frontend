"use client";
import UserList from "@/components/users-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <UserList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
