import { PrismaClient } from "@prisma/client";

const prisma = await new PrismaClient();

const createHome = await prisma.home.create({
  data: {
    title: 'Clean and modern apartment in downtown Providence, RI',
    description: 'Entire rental unit + free wifi',
    price: 185,
    guests: 4,
    beds: 2,
    baths: 1
  }
});

const updateHome = await prisma.home.update({
  data: {
    price: 200,

  },
  where: {
    id: `cjld2cjxh0000qzrmn831i7rn`
  }
})


const deleteHome = await prisma.home.delete({
  where: {
    id: `cjld2cjxh0000qzrmn831i7rn`
  }
})

const getAllHomes = await prisma.home.findMany();

export {
  createHome,
  updateHome,
  deleteHome,
  getAllHomes
}
