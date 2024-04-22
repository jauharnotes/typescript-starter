import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createInvoice', () => {
    it('should create an invoice', async () => {
      // Mock data
      const externalID = 'INV-123456';
      const amount = 10000; // Amount in Rupiah
      const email = 'customer@example.com';

      // Call createInvoice method
      const invoice = await service.createInvoice(externalID, amount, email);

      // Assertions
      expect(invoice.external_id).toBe(externalID);
      expect(invoice.amount).toBe(amount);
      expect(invoice.payer_email).toBe(email);
      // Add more assertions as needed based on the response structure
    });

    it('should throw an error if failed to create an invoice', async () => {
      // Mock data
      const externalID = 'INV-123456';
      const amount = 10000; // Amount in Rupiah
      const email = 'customer@example.com';

      // Mocking Xendit to throw an error
      jest
        .spyOn(service['xendit'].invoice, 'create')
        .mockRejectedValue(new Error('Failed to create invoice'));

      // Call createInvoice method and expect it to throw an error
      await expect(
        service.createInvoice(externalID, amount, email),
      ).rejects.toThrowError('Failed to create invoice');
    });
  });
});
