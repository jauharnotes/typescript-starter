import { Injectable } from '@nestjs/common';
import { XenditConfig } from '../config/xendit.config';
import Xendit from 'xendit-node';

@Injectable()
export class PaymentService {
  private xendit: any;

  constructor() {
    this.xendit = new Xendit({
      secretKey: XenditConfig.apiKey,
    });
  }

  async createInvoice(
    externalID: string,
    amount: number,
    email: string,
  ): Promise<any> {
    try {
      const invoice = await this.xendit.invoice.create({
        externalID,
        amount,
        payerEmail: email,
      });
      return invoice;
    } catch (error) {
      throw new Error(error);
    }
  }

  //   async capturePayment(invoiceId: string): Promise<any> {

  //   }

  //   async getInvoiceStatus(invoiceId: string): Promise<any> {

  //   }
}
