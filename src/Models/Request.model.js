

import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  requestType1: {
    type: String,
    required: true,
  },
  requestType2: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
},{timestamps:true});

const Request = mongoose.model('Request', requestSchema);

export {Request};
