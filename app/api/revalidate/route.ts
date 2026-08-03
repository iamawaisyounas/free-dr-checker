import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type RevalidateBody = {
  slug?: string;
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ message: "Revalidation is not configured." }, { status: 503 });
  }

  try {
    const { body, isValidSignature } = await parseBody<RevalidateBody>(request, secret);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
    }

    revalidatePath("/blog");

    if (body?.slug) {
      revalidatePath(`/blog/${body.slug}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to revalidate.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
