import { describe, it, expect, vi } from "vitest";
import { checkEmailExists } from "../src/lib/firebase/actions/action";


vi.mock("../src/lib/firebase/actions/action", () => ({
  checkEmailExists: async (email: string) =>
    ["kingraj1344@gmail.com", "john.doe@example.com"].includes(email),
}));

describe("checkEmailExists", () => {
  it("should return true if email exists", async () => {
    const result = await checkEmailExists("kingraj1344@gmail.com");
    expect(result).toBe(true);
  });

  it("should return false if email does not exist", async () => {
    const result = await checkEmailExists("nonexistent@example.com");
    expect(result).toBe(false);
  });
});
