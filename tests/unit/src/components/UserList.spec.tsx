import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "../../../../src/components/UserList";

describe("UserList Component", () => {
  it("should display users", () => {
    const mockUsers = [
      {
        id: 1,
        first_name: "Harry",
        last_name: "Potter",
        avatar: "https://via.placeholder.com/100",
      },
      {
        id: 2,
        first_name: "John",
        last_name: "Snow",
        avatar: "https://via.placeholder.com/100",
      },
    ];

    render(<UserList users={mockUsers} />);

    expect(screen.getByText(/Harry Potter/)).toBeInTheDocument();
    expect(screen.getByText(/John Snow/)).toBeInTheDocument();
  });
});
