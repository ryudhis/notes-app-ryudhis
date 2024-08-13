import prisma from "@/utils/prisma";

export async function GET() {
  try {
    const notes = await prisma.notes.findMany();

    return Response.json({
      status: 200,
      message: "Berhasil mengambil semua data notes!",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 400, message: "Something went wrong!" });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const notes = await prisma.notes.create({ data });

    return Response.json({
      status: 200,
      message: "Berhasil menambahkan data notes!",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 400, message: "Something went wrong!" });
  }
}
