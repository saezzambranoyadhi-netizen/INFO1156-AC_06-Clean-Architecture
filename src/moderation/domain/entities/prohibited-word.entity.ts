export class ProhibitedWord {
  constructor(
    public readonly id: string,
    public readonly word: string,
    public readonly category: string,
    public readonly createdAt: Date,
  ) {}
}