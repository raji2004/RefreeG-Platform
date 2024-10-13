import { describe, it, expect, beforeEach, vi } from "vitest";
import { GET } from "../src/app/api/admin/route"; // Adjust the import according to your setup
import * as admin from "../src/lib/firebase/admin"; // Import everything from admin

// Mock the entire admin module with explicit types
vi.mock("../src/lib/firebase/admin", () => ({
  getUsers: vi.fn() as vi.MockedFunction<() => Promise<{ id: string }[]>>,
  getCauses: vi.fn() as vi.MockedFunction<
    () => Promise<{ id: string; status: string }[]>
  >,
  getDonations: vi.fn() as vi.MockedFunction<
    () => Promise<{ amount: number }[]>
  >,
}));

describe("Admin Dashboard API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return correct dashboard data", async () => {
    // Mock implementations
    (
      admin.getUsers as vi.MockedFunction<typeof admin.getUsers>
    ).mockResolvedValue([{ id: "1" }, { id: "2" }]);
    (
      admin.getCauses as vi.MockedFunction<typeof admin.getCauses>
    ).mockResolvedValue([{ id: "1", status: "active" }]);
    (
      admin.getDonations as vi.MockedFunction<typeof admin.getDonations>
    ).mockResolvedValue([{ amount: 100 }, { amount: 200 }]);

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
    (
      admin.getUsers as vi.MockedFunction<typeof admin.getUsers>
    ).mockRejectedValue(new Error("Failed to fetch users"));

    const response = await GET(new Request("http://localhost/api/admin"));
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({ error: "An unknown error occurred." });
  });
});
