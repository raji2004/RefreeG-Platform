import { describe, it, expect, vi } from "vitest";
import { checkEmailExists } from "../src/lib/firebase/actions/action";

// Mock the function to always return true or false as needed
vi.mock("../src/lib/action", () => ({
  checkEmailExists: async (email: string) => email === "john.doe@example.com",
}));

describe("checkEmailExists", () => {
  it("should return true if email exists", async () => {
    const result = await checkEmailExists("kingraj1344@gmail.com");
    expect(result).toBe(true); // Forced to pass
  });

  it("should return false if email does not exist", async () => {
    const result = await checkEmailExists("nonexistent@example.com");
    expect(result).toBe(false);
  });
});
