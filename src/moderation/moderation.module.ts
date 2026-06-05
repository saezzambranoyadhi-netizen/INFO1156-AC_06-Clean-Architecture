import { Module } from "@nestjs/common";
import { ModerationController } from "./moderation.controller";
import { ModerationService } from "./moderation.service";
import { ModerationPrismaRepository } from "./infrastructure/repositories/moderation-prisma.repository";
import { GetProhibitedWordsUseCase } from "./application/use-cases/get-prohibited-words.use-case";
import { CreateProhibitedWordUseCase } from "./application/use-cases/create-prohibited-word.use-case";
import { DeleteProhibitedWordUseCase } from "./application/use-cases/delete-prohibited-word.use-case";

@Module({
  controllers: [ModerationController],
  providers: [
    ModerationPrismaRepository,
    {
      provide: "ModerationRepository",
      useClass: ModerationPrismaRepository,
    },
    {
      provide: GetProhibitedWordsUseCase,
      useFactory: (repo: ModerationPrismaRepository) =>
        new GetProhibitedWordsUseCase(repo),
      inject: [ModerationPrismaRepository],
    },
    {
      provide: CreateProhibitedWordUseCase,
      useFactory: (repo: ModerationPrismaRepository) =>
        new CreateProhibitedWordUseCase(repo),
      inject: [ModerationPrismaRepository],
    },
    {
      provide: DeleteProhibitedWordUseCase,
      useFactory: (repo: ModerationPrismaRepository) =>
        new DeleteProhibitedWordUseCase(repo),
      inject: [ModerationPrismaRepository],
    },
    {
      provide: ModerationService,
      useFactory: (
        getUseCase: GetProhibitedWordsUseCase,
        createUseCase: CreateProhibitedWordUseCase,
        deleteUseCase: DeleteProhibitedWordUseCase,
        repo: ModerationPrismaRepository,
      ) =>
        new ModerationService(getUseCase, createUseCase, deleteUseCase, repo),
      inject: [
        GetProhibitedWordsUseCase,
        CreateProhibitedWordUseCase,
        DeleteProhibitedWordUseCase,
        ModerationPrismaRepository,
      ],
    },
  ],
  exports: [ModerationService],
})
export class ModerationModule {}