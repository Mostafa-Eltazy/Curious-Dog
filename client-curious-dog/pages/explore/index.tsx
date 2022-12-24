import { NextPage } from 'next';
import Header from '../../components/HeaderComponents/Header';
import ProtectorComponent from '../../components/SharedComponents/ProtectorComponent';

const Explore: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <Header page="explore" />
      <ProtectorComponent
        userDisplay={
          <div className="flex items-center justify-center w-full">
            <div className="grid grid-rows-1 grid-cols-12 w-full ">
              <div className="col-start-4 col-end-10 mb-4 mt-8 mx-auto">
                <p>explore</p>
              </div>
            </div>
          </div>
        }
        emptyUserDisplay={null}
        emptyRedirectionUrl={'/'}
      />
    </div>
  );
};

export default Explore;
