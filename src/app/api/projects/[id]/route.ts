import { NextResponse } from "next/server";
import { verifyToken } from "@/middleware/auth.middleware";
import { requireRole } from "@/utils/roleGuard";
import {
  getProjectById,
  updateProject,
  deleteProject,
} from "@/services/project.service";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  verifyToken(req);

  const project = await getProjectById(params.id);

  return NextResponse.json(project);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = verifyToken(req);

    requireRole(user.role, ["ADMIN", "TEAM_LEADER"]);

    const body = await req.json();

    const project = await updateProject(
      params.id,
      body
    );

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 403 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = verifyToken(req);

    requireRole(user.role, ["ADMIN"]);

    const project = await deleteProject(params.id);

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 403 }
    );
  }
}