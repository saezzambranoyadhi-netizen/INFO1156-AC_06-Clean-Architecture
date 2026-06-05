import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateProhibitedWordDto } from "./moderation.dtos";
import { ModerationService } from "./moderation.service";
import { ProhibitedWord } from "./domain/entities/prohibited-word.entity";

@Controller("api/admin/prohibited-words")
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Get()
  findAll(): Promise<ProhibitedWord[]> {
    return this.moderationService.findAll();
  }

  @Post()
  create(@Body() body: CreateProhibitedWordDto): Promise<ProhibitedWord> {
    return this.moderationService.create(body.word, body.category);
  }

  @Delete(":id")
  delete(@Param("id") id: string): Promise<ProhibitedWord> {
    return this.moderationService.delete(id);
  }
}