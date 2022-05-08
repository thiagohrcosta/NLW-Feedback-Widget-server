import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbacUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
  ) {}

  async execute(request: SubmitFeedbacUseCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })
  }
}
