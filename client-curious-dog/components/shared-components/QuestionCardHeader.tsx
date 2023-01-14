import { QuestionWithAsker } from '../../lib/types/question-with-user.type';
import QuestionCardBadgeWall from './QuestionCardBadgeWall';
interface Props {
  question: QuestionWithAsker;
}
const QuestionCardHeader = ({ question }: Props) => {
  return (
    <>
      {question.asker ? (
        <div className="flex  justify-between mb-3">
          <div className="flex items-center">
            <div className="rounded-full border-solid border-2 border-indigo-600">
              <img
                className="rounded-full"
                src={`${question.asker.profilePicture ? question.asker.profilePicture : '/static/placeholder.jpeg'}`}
                style={{ objectFit: 'contain' }}
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col ml-2 justify-end h-full">
              <p>{question.asker.username}</p>
              <span className="text-xs"> was curious about ..</span>
            </div>
          </div>
          <QuestionCardBadgeWall question={question} />
        </div>
      ) : (
        <div className="flex items-center">
          <div className="rounded-full border-solid border-2 border-indigo-600">
            <img className="rounded-full" src={'/static/curious_dog_temp.jpg'} style={{ objectFit: 'contain' }} width={50} height={50} alt="ananomys temp" />
          </div>
          <div className="flex flex-col ml-2 mb-4 justify-end h-full text-xs">was ananomusly asking ..</div>
        </div>
      )}
    </>
  );
};

export default QuestionCardHeader;
