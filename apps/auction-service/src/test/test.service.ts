import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.test.findMany();
  }

  async add() {
    await this.prisma.test.create({
      data: {
        title: `${Math.random()}`,
        value: 12,
      },
    });
  }
}
