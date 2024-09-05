import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Access the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

export async function POST(request) {
  // Check if the MongoDB URI is defined before proceeding
  if (typeof uri === 'undefined') {
    return NextResponse.json(
      {
        message: 'Error registering farmer',
        error: 'MongoDB URI is not defined',
      },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri);

  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json({ message: 'Farmer address is required' }, { status: 400 });
    }

    await client.connect();
    const database = client.db('rainrelief');
    const farmers = database.collection('farmers');

    // Check if the farmer is already registered
    const existingFarmer = await farmers.findOne({ address });
    if (existingFarmer) {
      return NextResponse.json({ message: 'Farmer is already registered' }, { status: 400 });
    }

    // Insert the new farmer
    await farmers.insertOne({ address, registeredAt: new Date() });

    return NextResponse.json({ message: 'Request sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error registering farmer:', error);
    return NextResponse.json({ message: 'Error registering farmer', error: error.message }, { status: 500 });
  } finally {
    // Ensure client is closed properly
    if (client && client.close) {
      await client.close();
    }
  }
}
