import { prisma } from "@/lib/prisma";
import { decryptedPassword, isExpired } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const bodySchema = z.object({
  shortId: z.string(),
  password: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // Read query parameters
  try {
    console.log("req.url", req.url);
    const body = await req.json();
    const parsedBody = await bodySchema.safeParseAsync(body);
    console.log("parsedBody = ", parsedBody);

    if (!parsedBody.success) {
      return NextResponse.json(parsedBody.error.issues, { status: 400 });
    }

    const shortId = parsedBody.data.shortId;
    const password = parsedBody.data.password;
    console.log("shortId", shortId, "password", password);

    const originalUrl = await prisma.shortIdWithoutSlug.findFirst({
      where: {
        id: parseInt(shortId),
      },
      select: {
        password: true,
        expiry: true,
        correctUrl: true,
        isExpiry: true,
        isPassword: true,
      },
    });

    console.log(".....originalUrl", originalUrl);
    if (!originalUrl) {
      return NextResponse.json({ originalUrl: null }, { status: 404 });
    }

    if (originalUrl.isPassword && !password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }
    const decryptedPass = decryptedPassword(parsedBody.data.password || "");
    const isPasswordCorrect = bcrypt.compareSync(
      decryptedPass,
      originalUrl.password || ""
    );
    console.log(
      "decryptedPass",
      decryptedPass + " isPasswordCorrect",
      isPasswordCorrect
    );
    if (!isPasswordCorrect && originalUrl.password) {
      return NextResponse.json({ error: "Wrong password" }, { status: 400 });
    }
    let date = new Date();
    if (originalUrl.isExpiry && originalUrl.expiry) {
      date = originalUrl.expiry;
    }
    const expired = isExpired(date);
    if (expired) {
      await prisma.shortIdWithoutSlug.delete({
        where: {
          id: parseInt(shortId),
        },
      });

      return NextResponse.json({ error: "Link expired" }, { status: 400 });
    }

    return NextResponse.json(
      { originalUrl: originalUrl.correctUrl },
      { status: 200 }
    );
  } catch (e) {
    console.log("e==", e);
    return NextResponse.json({ originalUrl: null }, { status: 404 });
  }
}
