import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const moradia = await prisma.category.create({
    data: {
      name: 'Moradia',
      icon: 'Home'
    }
  });

  const lazer = await prisma.category.create({
    data: {
      name: 'Lazer',
      icon: 'Gamepad'
    }
  });

  const bancoBrasil = await prisma.bank.create({
    data: {
      name: 'Banco do Brasil',
      code: '001'
    }
  });

  const caixa = await prisma.bank.create({
    data: {
      name: 'Caixa Econômica Federal',
      code: '104'
    }
  });

  await prisma.transaction.createMany({
    data: [
      {
        description: 'Aluguel',
        amount: 1200.00,
        type: 'debit',
        date: new Date('2024-04-01'),
        categoryId: moradia.id,
        bankId: bancoBrasil.id
      },
      {
        description: 'Cinema',
        amount: 45.00,
        type: 'debit',
        date: new Date('2024-04-05'),
        categoryId: lazer.id,
        bankId: caixa.id
      }
    ]
  });

  console.log('Seed concluído com sucesso.');
}

seed()
  .catch((error) => {
    console.error('Erro ao rodar o seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
