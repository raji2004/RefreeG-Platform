import { vi, describe, it, expect } from 'vitest';
import { recordTransaction } from '../src/lib/transactionActions';
import { setDoc, doc } from 'firebase/firestore';

// Mock Firestore methods directly
vi.mock('firebase/firestore', () => {
  return {
    setDoc: vi.fn(),
    doc: vi.fn(() => ({ id: 'mockTransactionId' })), // Mocking the document reference
    getFirestore: vi.fn(), // Mocking getFirestore
  };
});

describe('Transaction Actions', () => {
  describe('recordTransaction', () => {
    it('should successfully record a transaction', async () => {
      const paymentResponse = { transactionId: 'trans123', status: 'success' };
      const donorDetails = { name: 'John Doe', email: 'john@example.com' };
      const amount = 100;
      const isRecurring = false;
      const causeId = 'cause123';

      // Call the function
      await recordTransaction(paymentResponse, donorDetails, amount, isRecurring, causeId);

      // Ensure that the Firestore setDoc was called with the correct parameters
      expect(setDoc).toHaveBeenCalledWith(
        expect.any(Object), // Mocked Firestore document reference
        expect.objectContaining({
          donorDetails: donorDetails,
          amount: amount,
          isRecurring: isRecurring,
          causeId: causeId,
          paymentStatus: paymentResponse.status,
          transactionDate: expect.any(String), // Transaction date will be set dynamically
        })
      );
    });
  });
});
