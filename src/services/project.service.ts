import { prisma } from "@/lib/prisma";

export async function createProject(data: {
  name: string;
  description?: string;
  ownerId: string;
}) {
  return prisma.project.create({
    data,
  });
}

export async function getProjects() {
  return prisma.project.findMany({
    include: {
      owner: true,
      members: true,
      tasks: true,
    },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      owner: true,
      members: true,
      tasks: true,
    },
  });
}

export async function updateProject(
  id: string,
  data: any
) {
  return prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}