import { prisma } from "@/lib/prisma";
import z from "zod";
import { NextRequest, NextResponse } from "next/server";

const bodySchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  id: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsedBody = await bodySchema.safeParseAsync(body);
  console.log(".........parsedBody", parsedBody);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.issues, { status: 400 });
  }

  const slug: string = parsedBody.data.id;

  const { latitude, longitude } = parsedBody.data;
  console.log("slug", slug);

  const id = await prisma.shortIdWithSlug.findUnique({
    where: {
      slug: slug,
    },
  });
  console.log("id", id);
  if (!id) {
    return NextResponse.json({ error: "No id found" }, { status: 404 });
  }

  console.log("Received lat/lon:", { latitude, longitude, id });

  // 🔎 Reverse geocode with Nominatim
  let address = "Unknown";
  try {
    const nomUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`;
    const res = await fetch(nomUrl, {
      headers: {
        "User-Agent": "url-shortener/1.0 (your@email.com)",
      },
    });
    if (res.ok) {
      const data = await res.json();
      address = data.display_name || "Unknown";
      console.log("✅ Reverse geocoded address:", address);
    } else {
      console.warn("⚠️ Nominatim failed:", res.status);
    }
  } catch (err) {
    console.error("❌ Reverse geocode error:", err);
  }

  const geolocation = await prisma.geoLocation.create({
    data: {
      latitude: parsedBody.data.latitude,
      longitude: parsedBody.data.longitude,
      address: address,

      ShortIdWithSlug: {
        connect: { id: id.id },
      },
    },
    include: {
      ShortIdWithSlug: true,
    },
  });

  console.log("geolocation", geolocation);
  const allLocations = await prisma.geoLocation.findMany({
    where: { shortIdWithSlugId: id.id },
    select: {
      id: true,
      latitude: true,
      longitude: true,
      address: true,
      shortIdWithSlugId: true,
      createdAt: true,
    },

    orderBy: {
      id: "asc",
    },
  });

  console.log("All locations:", allLocations);

  return new NextResponse(JSON.stringify("geolocation"), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
