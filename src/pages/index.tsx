import { NextPage } from 'next'
import { ApplicationWrapper } from '../components/layout/ApplicationWrapper'

const Home: NextPage = () => {
  const titleMessage = 'Home'
  const descriptionMessage = 'Home of the cocktails website'

  return (
    <ApplicationWrapper title={titleMessage} description={descriptionMessage}>
      <div className="grow flex flex-col justify-center items-center bg-[url('/images/bg-image.jpg')]">
        <div className='grow bg-black w-full justify-center items-center flex opacity-50'>
          <h1 className='text-6xl font-bold text-white text-center'>
            Welcome to my cocktails NextJS app with Typescript
          </h1>
        </div>
      </div>
    </ApplicationWrapper>
  )
}

export default Home
