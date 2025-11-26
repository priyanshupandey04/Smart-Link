import { prisma } from "@/lib/prisma";
import z from "zod";
import { NextRequest, NextResponse } from "next/server";

// only require lat, lon, id now
const bodySchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  id: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = await bodySchema.safeParseAsync(body);

    if (!parsedBody.success) {
      return NextResponse.json(parsedBody.error.issues, { status: 400 });
    }

    const { latitude, longitude, id } = parsedBody.data;
    const shortId = Number(id);
    const existingId = await prisma.shortIdWithoutSlug.findFirst({
      where: { id: shortId },
      select: {
        id: true,
      },
    });
    console.log("existingId", existingId);
    if (!existingId) {
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

    // save geolocation
    const geolocation = await prisma.geoLocation.create({
      data: {
        latitude,
        longitude,
        address,
        createdAt: new Date(),
        ShortIdWithoutSlug: {
          connect: { id: existingId.id },
        },
      },
    });

    console.log("Inserted geolocation:", geolocation);

    const allLocations = await prisma.geoLocation.findMany({
      where: { shortIdWithoutSlugId: existingId.id },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        address: true,
        shortIdWithoutSlugId: true,
        createdAt: true,
      },

      orderBy: {
        id: "asc",
      },
    });

    console.log("All locations:", allLocations);

    return NextResponse.json(allLocations, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
