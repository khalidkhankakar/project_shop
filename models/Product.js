import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  qty: Number,
  price: Number,
  creator: {
    type: Schema.Types.String,
    ref: 'User'
  }
},{
timestamp:true, 
}
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;