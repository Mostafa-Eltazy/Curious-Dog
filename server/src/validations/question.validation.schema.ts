import joi from 'joi';

export const createQuestionReqSchema = {
  body: joi
    .object()
    .keys({
      body: joi.string().min(1).max(600).required(),
      isAnonymous: joi.bool().required(),
    })
    .required(),
};