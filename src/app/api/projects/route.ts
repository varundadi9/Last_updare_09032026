import { NextResponse } from "next/server";
import { verifyToken } from "@/middleware/auth.middleware";
import { requireRole } from "@/utils/roleGuard";
import {
  createProject,
  getProjects,
} from "@/services/project.service";

export async function POST(req: Request) {
  try {
    const user = verifyToken(req);

    requireRole(user.role, ["ADMIN", "TEAM_LEADER"]);

    const body = await req.json();

    const project = await createProject({
      ...body,
      ownerId: user.userId,
    });

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 403 }
    );
  }
}

export async function GET(req: Request) {
  try {
    verifyToken(req);

    const projects = await getProjects();

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    );
  }
}