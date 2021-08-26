import { Test, TestingModule } from '@nestjs/testing';
import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';

describe('LikeResolver', () => {
  let resolver: LikeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeResolver, LikeService],
    }).compile();

    resolver = module.get<LikeResolver>(LikeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
