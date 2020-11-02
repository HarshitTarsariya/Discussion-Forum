import { TestBed } from '@angular/core/testing';

import { QuestionanswerService } from './questionanswer.service';

describe('QuestionanswerService', () => {
  let service: QuestionanswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionanswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
