import { describe, it, expect, beforeEach, vi } from "vitest";
import { GET, POST, PATCH } from "../src/app/api/users/route"; // Adjust import according to your file structure
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

// Mock Firebase Firestore
vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    getFirestore: vi.fn(),
    collection: vi.fn(),
    getDocs: vi.fn(),
    updateDoc: vi.fn(),
    doc: vi.fn(),
  };
});

describe("User Management API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET", () => {
    it("should fetch all users", async () => {
      const mockUsers = [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Doe" },
      ];
      const mockSnapshot = {
        docs: mockUsers.map((user) => ({ id: user.id, data: () => user })),
      };
      (getDocs as vi.Mock).mockResolvedValueOnce(mockSnapshot);

      const response = await GET();
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json).toEqual(mockUsers);
    });

    it("should handle errors when fetching users fails", async () => {
      (getDocs as vi.Mock).mockRejectedValueOnce(new Error("Fetch error"));

      const response = await GET();
      expect(response.status).toBe(500);
    });
  });

  describe("POST", () => {
    it("should update user role", async () => {
      const requestBody = { userId: "1", role: "admin" };
      const request = new Request("http://localhost/api/user", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      (doc as vi.Mock).mockReturnValue({ id: "1" });
      (updateDoc as vi.Mock).mockResolvedValueOnce(undefined);

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json).toEqual({ message: "User role updated successfully." });
    });

    it("should handle errors when updating user role fails", async () => {
      const requestBody = { userId: "1", role: "admin" };
      const request = new Request("http://localhost/api/user", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      (updateDoc as vi.Mock).mockRejectedValueOnce(new Error("Update error"));

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(500);
      expect(json).toEqual({ message: "Error updating user role." });
    });
  });

  describe("PATCH", () => {
    it("should block a user", async () => {
      const requestBody = { userId: "1", isBlocked: true };
      const request = new Request("http://localhost/api/user", {
        method: "PATCH",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      (doc as vi.Mock).mockReturnValue({ id: "1" });
      (updateDoc as vi.Mock).mockResolvedValueOnce(undefined);

      const response = await PATCH(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json).toEqual({ message: "User blocked." });
    });

    it("should handle errors when blocking a user fails", async () => {
      const requestBody = { userId: "1", isBlocked: true };
      const request = new Request("http://localhost/api/user", {
        method: "PATCH",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      (updateDoc as vi.Mock).mockRejectedValueOnce(new Error("Update error"));

      const response = await PATCH(request);
      const json = await response.json();

      expect(response.status).toBe(500);
      expect(json).toEqual({ message: "Error updating user status." });
    });
  });
});
