// src/app/api/admin/adminAPI.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { GET } from "./route"; // Adjust the import according to your setup
import * as admin from "../../../lib/firebase/admin"; // Import everything from admin

vi.mock("../../../lib/firebase/admin"); // Mock the entire admin module

describe("Admin Dashboard API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return correct dashboard data", async () => {
    // Mock implementations
    (admin.getUsers as vi.Mock).mockResolvedValue([{ id: "1" }, { id: "2" }]);
    (admin.getCauses as vi.Mock).mockResolvedValue([
      { id: "1", status: "active" },
    ]);
    (admin.getDonations as vi.Mock).mockResolvedValue([
      { amount: 100 },
      { amount: 200 },
    ]);

    const response = await GET(new Request("http://localhost/api/admin"));

    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({
      totalUsers: 2,
      activeCauses: 1,
      totalDonations: 300,
    });
  });

  it("should handle errors gracefully", async () => {
    (admin.getUsers as vi.Mock).mockRejectedValue(
      new Error("Failed to fetch users")
    );

    const response = await GET(new Request("http://localhost/api/admin"));
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({ error: "An unknown error occurred." });
  });
});
