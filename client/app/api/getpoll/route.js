import clientPromise from "@/lib/mongodb";

export async function POST(request) {

    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("pollswift");
    const collection = db.collection("polls");

    const poll = await collection.findOne({pollId: body.pollId});

    return Response.json({ poll: poll });
    
}