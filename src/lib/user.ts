import prisma from "./db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      cacheStrategy: { ttl: 60 },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};
