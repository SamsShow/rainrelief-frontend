import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import tls from 'tls';

dotenv.config();

const mongodbUri = process.env.NEXT_MONGODB_URI;

if (!mongodbUri) {
  console.error('NEXT_MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

let client;

export async function connectToDatabase() {
  if (client) {
    return client.db();
  }

  try {
    client = await MongoClient.connect(mongodbUri, {
      ssl: true,
      sslValidate: true,
      tlsAllowInvalidCertificates: true, // Use this option cautiously
      tlsInsecure: true, // Use this option cautiously
      useUnifiedTopology: false,
      useNewUrlParser: false,
      tlsCAFile: tls.rootCertificates[0], // Use the default root CA
    });
    console.log('Connected to MongoDB');
    return client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

export async function registerFarmer(farmerData) {
  const db = await connectToDatabase();
  const collection = db.collection('farmers');

  try {
    const result = await collection.insertOne(farmerData);
    console.log('Farmer registered successfully:', result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error('Error registering farmer:', error);
    throw error;
  }
}

// Usage in API route
export async function POST(request) {
  try {
    const farmerData = await request.json();
    const farmerId = await registerFarmer(farmerData);
    return new Response(JSON.stringify({ success: true, farmerId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error registering farmer:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}