import { NextResponse } from "next/server";
import { expect, test, vi, beforeEach } from "vitest";
import { getFirestore } from "firebase/firestore"; // Ensure to import this if needed
import { collection, query, where, getDocs } from "firebase/firestore";

// Mock Firestore functions
vi.mock("firebase/firestore", () => {
  return {
    getFirestore: vi.fn(), // Mock getFirestore
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    getDocs: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
  };
});

// Import the GET function
import { GET } from "../src/app/api/dashboard/route"; // Adjust the path as needed

// Function to create a mock Request object
const createMockRequest = (query: string): Request => {
  return new Request(`http://localhost/api/dashboard?${query}`, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
  });
};

describe("Dashboard API", () => {
  const userId = "testUserId";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should retrieve donation history successfully", async () => {
    const req = createMockRequest(`userId=${userId}&page=1`);

    // Mock the Firestore response
    const mockDonations = [
      { id: "1", date: "2023-01-01", amount: 100, cause: "Cause A" },
      { id: "2", date: "2023-01-02", amount: 200, cause: "Cause B" },
    ];

    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockDonations.map((donation) => ({
        id: donation.id,
        data: () => donation,
      })),
    });

    const response = await GET(req);

    const expectedResponse = NextResponse.json({
      donations: mockDonations,
      page: 1,
    });

    // Compare the JSON content
    const actualData = await response.json();
    const expectedData = await expectedResponse.json();

    expect(actualData).toEqual(expectedData);
  });

  test("should return 400 for missing userId", async () => {
    const req = createMockRequest(`page=1`);

    const response = await GET(req);

    const expectedResponse = NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );

    // Compare the JSON content
    const actualData = await response.json();
    const expectedData = await expectedResponse.json();

    expect(actualData).toEqual(expectedData);
  });

  test("should return 500 on error fetching donation history", async () => {
    const req = createMockRequest(`userId=${userId}&page=1`);

    // Simulate an error in getDocs
    (getDocs as jest.Mock).mockRejectedValue(new Error("Fetch failed"));

    const response = await GET(req);

    const expectedResponse = NextResponse.json(
      { message: "Error fetching donation history" },
      { status: 500 }
    );

    // Compare the JSON content
    const actualData = await response.json();
    const expectedData = await expectedResponse.json();

    expect(actualData).toEqual(expectedData);
  });
});
