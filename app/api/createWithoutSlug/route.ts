import { prisma } from "@/lib/prisma";
import { bcryptedPassword, decryptedPassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  correctUrl: z.string(),
  password: z.string().optional(),
  isPassword: z.boolean().optional(),
  expiry: z.coerce.date().optional(),
  isExpiry: z.boolean().optional(),
});

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = await bodySchema.safeParseAsync(body);
    console.log("body = ", body);
    if (!parsedBody.success) {
      return NextResponse.json(parsedBody.error.issues, { status: 400 });
    }

    const shortId = await prisma.shortIdWithoutSlug.findFirst({
      where: {
        correctUrl: parsedBody.data.correctUrl,
      },
      select: {
        id: true,
        password: true,
        isPassword: true,
        isExpiry: true,
      },
    });

    console.log("shortId", shortId);

    if (
      shortId &&
      !shortId.isPassword &&
      !parsedBody.data.isPassword &&
      !parsedBody.data.isExpiry &&
      !shortId.isExpiry
    ) {
      return NextResponse.json({
        correctUrl: parsedBody.data.correctUrl,
        shortId: shortId.id,
      });
    }

    let decryptedPass: string | null = null;
    if (parsedBody.data.password) {
      decryptedPass = decryptedPassword(parsedBody.data.password);
    }

    console.log(
      "decryptedPass",
      decryptedPass + " encrypted pass = " + parsedBody.data.password
    );

    let bcryptedPass = "";
    if (decryptedPass) {
      bcryptedPass = bcryptedPassword(decryptedPass);
    }

    const newShortIdWihoutSlug = await prisma.shortIdWithoutSlug.create({
      data: {
        correctUrl: parsedBody.data.correctUrl,
        password: bcryptedPass,
        expiry: parsedBody.data.expiry,
        isPassword: parsedBody.data.isPassword,
        isExpiry: parsedBody.data.isExpiry,
      },
    });

    console.log("newShortIdWihoutSlug", newShortIdWihoutSlug);

    return NextResponse.json(
      {
        correctUrl: parsedBody.data.correctUrl,
        shortId: newShortIdWihoutSlug.id,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
