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
  console.log("req.url", req.url);
  const body = await req.json();
  console.log("body", body);
  const parsedBody = await bodySchema.safeParseAsync(body);
  console.log("parsedBody = ", parsedBody);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.issues, { status: 400 });
  }

  const { shortId, password } = parsedBody.data;
  console.log("shortId", shortId, "password", password);

  const originalUrl = await prisma.shortIdWithSlug.findFirst({
    where: {
      slug: shortId,
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

  if (originalUrl.isExpiry) {
    let isexpiry = await isExpiry(originalUrl, shortId);
    console.log("->isexpiry", isexpiry);
    if (isexpiry) {
      return NextResponse.json(isexpiry, { status: 400 });
    }
    if (!originalUrl.isPassword) {
      return NextResponse.json(
        { originalUrl: originalUrl.correctUrl },
        { status: 200 }
      );
    }
  }

  if (
    (originalUrl.password && parsedBody.data.password == "") ||
    parsedBody.data.password == null
  ) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }
  const decryptedPass = decryptedPassword(parsedBody.data.password);
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

  return NextResponse.json(
    { originalUrl: originalUrl.correctUrl },
    { status: 200 }
  );
}

const isExpiry = async (
  originalUrl: {
    password: string | null;
    correctUrl: string;
    expiry: Date | null;
    isPassword: boolean | null;
    isExpiry: boolean | null;
  } | null,
  shortId: string
) => {
  if (!originalUrl) {
    return null;
  }
  let date = new Date();
  if (originalUrl.isExpiry && originalUrl.expiry) {
    date = originalUrl.expiry;
  }

  console.log("date = ", date);
  const expired = isExpired(date);
  if (expired) {
    await prisma.shortIdWithSlug.delete({
      where: {
        slug: shortId,
      },
    });

    return { error: "Link expired" };
  }

  return null;
};
