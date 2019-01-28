import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    __v: { type: Number, select: false },
    orderDate: {
      type: Date,
      required: true
    },
    clientFirstName: {
      type: String,
      required: true
    },
    clientLastName: {
      type: String,
      required: true
    },
    clientEmail: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    productsNumber: {
      type: Number,
      required: true
    },
    pickedSupplies: {
      type: String,
      required: true
    },
    pickedSuppliesPrice: {
      type: String,
      required: true
    },
    clientId: {
      type: String,
      required: true
    },
    order: [{}]
  },
  { versionKey: false }
);

schema.plugin(mongoosePaginate);

export default mongoose.model('Order', schema);
