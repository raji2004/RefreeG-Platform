import { describe, it, expect, beforeEach, vi } from "vitest";
import { GET, PATCH, DELETE } from "../src/app/api/causes/route"; // Adjust the import according to your setup
import { db } from "@/lib/firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Adjusted mock to include Firestore functions
vi.mock("@/lib/firebase/config"); // Mock the Firestore config
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  getFirestore: vi.fn(), // Add this line
}));

describe("Causes API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch all causes", async () => {
    const mockCauses = [
      { id: "1", title: "Cause 1", description: "Description 1", status: "active" },
      { id: "2", title: "Cause 2", description: "Description 2", status: "inactive" },
    ];

    (collection as vi.Mock).mockReturnValue("mockCollection");
    (getDocs as vi.Mock).mockResolvedValue({
      docs: mockCauses.map(cause => ({
        id: cause.id,
        data: () => cause,
      })),
    });

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual(mockCauses);
  });

  it("should handle errors when fetching causes", async () => {
    (getDocs as vi.Mock).mockRejectedValue(new Error("Failed to fetch causes"));

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({ error: "Unable to fetch causes" });
  });

  it("should update a cause", async () => {
    const mockRequest = {
      json: vi.fn().mockResolvedValue({
        id: "1",
        title: "Updated Cause",
        description: "Updated Description",
        status: "active",
      }),
    };

    (doc as vi.Mock).mockReturnValue("mockDoc");
    (updateDoc as vi.Mock).mockResolvedValue(undefined);

    const response = await PATCH(mockRequest as unknown as Request);

    expect(updateDoc).toHaveBeenCalledWith("mockDoc", {
      title: "Updated Cause",
      description: "Updated Description",
      status: "active",
    });
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ message: "Cause updated successfully." });
  });

  it("should handle errors when updating a cause", async () => {
    const mockRequest = {
      json: vi.fn().mockResolvedValue({ id: "1" }),
    };

    (updateDoc as vi.Mock).mockRejectedValue(new Error("Failed to update cause"));

    const response = await PATCH(mockRequest as unknown as Request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({ error: "Unable to update cause" });
  });

  it("should delete a cause", async () => {
    const mockRequest = {
      json: vi.fn().mockResolvedValue({ id: "1" }),
    };

    (doc as vi.Mock).mockReturnValue("mockDoc");
    (deleteDoc as vi.Mock).mockResolvedValue(undefined);

    const response = await DELETE(mockRequest as unknown as Request);
    expect(deleteDoc).toHaveBeenCalledWith("mockDoc");
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ message: "Cause rejected successfully." });
  });

  it("should handle errors when deleting a cause", async () => {
    const mockRequest = {
      json: vi.fn().mockResolvedValue({ id: "1" }),
    };

    (deleteDoc as vi.Mock).mockRejectedValue(new Error("Failed to delete cause"));

    const response = await DELETE(mockRequest as unknown as Request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({ error: "Unable to reject cause" });
  });
});
