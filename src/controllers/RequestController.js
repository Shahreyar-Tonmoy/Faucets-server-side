// controllers/RequestController.js
import { Request } from '../Models/Request.model.js';

const submitRequest = async (req, res) => {
  const { walletAddress,hash, requestType1, requestType2 } = req.body;

  try {
    const newRequest = new Request({
      walletAddress,
      requestType1,
      requestType2,
      hash
    });

    // Save the request to the database
    await newRequest.save();

    res.json({ message: 'Request submitted successfully!' });
  } catch (error) {
    console.error('Error submitting request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();

    console.log(requests)

    res.send(requests);

  } catch (error) {
    console.error('Error getting requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { submitRequest, getAllRequests };
