import { prisma } from "@/lib/prisma";
import {
  bcryptedPassword,
  decryptedPassword,
  encryptedPassword,
} from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  correctUrl: z.string(),
  slug: z.string().regex(/^[a-zA-Z0-9_]+$/, {
    message:
      "Slug can only contain letters, numbers and underscores, [a-z] , [A-Z], [0-9] and underscores are allowed.",
  }),
  password: z.string().optional(),
  isPassword: z.boolean().optional(),
  expiry: z.coerce.date().optional(),
  isExpiry: z.boolean().optional(),
});

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = await bodySchema.safeParseAsync(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.issues[0].message },
        { status: 400 }
      );
    }
    console.log(parsedBody);

    const idWithSlug = await prisma.shortIdWithSlug.findFirst({
      where: {
        slug: parsedBody.data.slug + "_",
      },
      select: {
        id: true,
      },
    });

    console.log("idWithSlug", idWithSlug);

    if (idWithSlug) {
      return NextResponse.json(
        { error: "Slug already exists, try another one." },
        { status: 400 }
      );
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
    const newShortIdWithSlug = await prisma.shortIdWithSlug.create({
      data: {
        slug: parsedBody.data.slug + "_",
        correctUrl: parsedBody.data.correctUrl,
        password: bcryptedPass,
        expiry: parsedBody.data.expiry,
        isPassword: parsedBody.data.isPassword,
        isExpiry: parsedBody.data.isExpiry,
      },
    });

    console.log("newShortIdWithSlug", newShortIdWithSlug);

    return NextResponse.json(
      {
        correctUrl: parsedBody.data.correctUrl,
        shortId: newShortIdWithSlug.slug,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
