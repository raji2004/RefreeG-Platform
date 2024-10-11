import { NextResponse } from "next/server";
import { db } from "../src/lib/firebase/config";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { expect, test, vi, beforeEach } from "vitest";

// Mock Firestore's updateDoc function and include getFirestore
vi.mock("firebase/firestore", () => {
  return {
    doc: vi.fn(),
    updateDoc: vi.fn(),
    getFirestore: vi.fn(), // Add this line to mock getFirestore
  };
});

// Import your PATCH function here
import { PATCH } from "../src/app/api/profile/route"; // Adjust the path as needed

// Define the type for the request body
interface MockRequestBody {
  userId: string;
  name?: string;
  email?: string;
  avatar?: string;
}

// Function to create a mock Request object
const createMockRequest = (body: MockRequestBody): Request => {
  return {
    json: vi.fn().mockResolvedValue(body),
    method: "PATCH", // Assuming you are using PATCH
    headers: new Headers({ "Content-Type": "application/json" }), // Example headers
  } as unknown as Request; // Type assertion to cast to Request
};

describe("User Profile Management API", () => {
  const userId = "testUserId";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should update user profile successfully", async () => {
    const req = createMockRequest({
      userId,
      name: "John Doe",
      email: "john@example.com",
    });

    const response = await PATCH(req);
    expect(updateDoc).toHaveBeenCalledWith(doc(db, "users", userId), {
      name: "John Doe",
      email: "john@example.com",
    });
    expect(await response.json()).toEqual({ message: "Profile updated successfully." }); // Check response JSON
  });

  test("should return 400 for invalid input", async () => {
    const req = createMockRequest({ userId });

    const response = await PATCH(req);
    expect(await response.text()).toEqual("Invalid input"); // Check response text
    expect(response.status).toBe(400); // Check response status
  });

  test("should return 500 on update failure", async () => {
    const req = createMockRequest({ userId, name: "Jane Doe" });

    // Simulate an error in updateDoc
    (updateDoc as unknown as jest.Mock).mockRejectedValue(new Error("Update failed"));

    const response = await PATCH(req);
    expect(await response.text()).toEqual("Error updating profile"); // Check response text
    expect(response.status).toBe(500); // Check response status
  });
});
