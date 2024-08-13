import prisma from "@/utils/prisma";

export async function GET(req) {
  try {
    const id = req.url.split("/notes/")[1];
    const notes = await prisma.notes.findUnique({
      where: {
        id,
      },
    });

    return Response.json({
      status: 200,
      message: "Berhasil ambil data!",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 400, message: "Something went wrong!" });
  }
}

export async function DELETE(req) {
  try {
    const id = req.url.split("/notes/")[1];
    const notes = await prisma.notes.delete({
      where: {
        id,
      },
    });

    return Response.json({
      status: 200,
      message: "Berhasil hapus data!",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 400, message: "Something went wrong!" });
  }
}

export async function PATCH(req) {
  try {
    const id = req.url.split("/notes/")[1];
    const data = await req.json();

    const notes = await prisma.notes.update({
      where: {
        id,
      },
      data,
    });

    return Response.json({
      status: 200,
      message: "Berhasil ubah data!",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 400, message: "Something went wrong!" });
  }
}
