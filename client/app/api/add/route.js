import clientPromise from "@/lib/mongodb";

export async function POST(request) {

    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("pollswift");
    const collection = db.collection("polls");

    const doc = await collection.insertOne(body);

    return Response.json({
        status: 200,
        body: { success: true },
    });
}