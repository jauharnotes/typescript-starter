import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('/api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-invoice')
  async createInvoice(@Body() data: any): Promise<any> {
    try {
      const { externalID, amount, email } = data;
      const invoice = await this.paymentService.createInvoice(
        externalID,
        amount,
        email,
      );
      return invoice;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('webhook/xendit')
  async handleWebhook(@Body() data: any): Promise<any> {
    try {
      // Handle Xendit webhook here
      console.log('Received Xendit webhook:', data);
      // Process the webhook data as needed
      return { received: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //   @Post('capture-payment')
  //   async capturePayment(@Body() data: any): Promise<any> {

  //   }

  //   @Post('get-invoice-status')
  //   async getInvoiceStatus(@Body() data: any): Promise<any> {

  //   }
}
