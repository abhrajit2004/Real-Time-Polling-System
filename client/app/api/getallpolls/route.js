import clientPromise from "@/lib/mongodb";

export async function POST(request) {

    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("pollswift");
    const collection = db.collection("polls");

    const polls = await collection.find({email: body.email}).toArray();

    return Response.json({ polls: polls });
}