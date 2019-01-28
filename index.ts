import User from '@components/user/userModel';
import { NextFunction, Request, Response } from 'express';
import * as resStatus from 'http-status';
import Model from './Model';

export class AppOrders {
  // CREATE APP ORDER
  public async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const newOrder = new Model({
      orderDate: req.body.orderDate,
      clientEmail: req.body.clientEmail,
      clientFirstName: req.body.clientFirstName,
      clientLastName: req.body.clientLastName,
      status: req.body.status,
      productsNumber: req.body.productsNumber,
      pickedSupplies: req.body.pickedSupplies,
      pickedSuppliesPrice: req.body.pickedSuppliesPrice,
      order: req.body.order,
      totalPrice: req.body.totalPrice,
      clientId: req.user._id
    });

    await newOrder
      .save()
      .then((result: any) => {
        console.log(result);
        if (result) {
          const query = User.findOne({ _id: req.user._id });
          query.exec((err: NodeJS.ErrnoException, user: any) => {
            if (err) {
              return res
                .status(resStatus.INTERNAL_SERVER_ERROR)
                .json({ err, success: false });
            }
            const expPoints: number = Math.ceil(result.totalPrice);
            user.expPoints += expPoints;
            user.orders.push(result);
            user.save().then((appUser: any) => {
              return res.status(resStatus.CREATED).json({
                message: 'api.order-success',
                result,
                success: true
              });
            });
          });
        }
      })
      .catch((err: NodeJS.ErrnoException) => {
        console.log(err);
        return res
          .status(resStatus.INTERNAL_SERVER_ERROR)
          .json({ err, success: false });
      });
  }

  // GET CLIENT ORDERS
  public async getClientOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = req.params.id;
    const query = Model.find({ clientId: id });
    query
      .exec()
      .then((order: any) => {
        if (!order) {
          return res.status(resStatus.NOT_FOUND).json({
            message: 'Notify not found',
            success: false
          });
        }
        return res.status(resStatus.OK).json({ order, success: true });
      })
      .catch((err: NodeJS.ErrnoException) => {
        return res
          .status(resStatus.INTERNAL_SERVER_ERROR)
          .json({ err, success: false });
      });
  }
}
