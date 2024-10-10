import { describe, it, expect } from "vitest";
import { checkEmailExists } from "../src/lib/action"; // Adjust path to your actual functions file

describe("checkEmailExists", () => {
  it("should return true if email exists", async () => {
    // Ensure test@example.com is in your Firestore database
    const result = await checkEmailExists("john.doe@example.com");

    expect(result).toBe(true); // Change to true since we're checking for existence
  });

  it("should return false if email does not exist", async () => {
    const result = await checkEmailExists("nonexistent@example.com");

    expect(result).toBe(false); // This should remain false since we're checking for non-existence
  });
});
