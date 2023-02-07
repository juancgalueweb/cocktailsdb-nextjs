import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer className='p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800'>
      <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
        Project created by Juan C. Galu&eacute; R.
      </span>

      <ul className='flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0'>
        <li>
          <a
            href='mailto: juancgalue@gmail.com?subject=Email%20from%20NextJS%20Vercel%20App'
            className='text-blue-600 font-light md:mr-6 mr-4'
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className='mx-1'
            ></FontAwesomeIcon>{' '}
            juancgalue@gmail.com
          </a>{' '}
        </li>
        <li>
          <a
            href='https://github.com/juancgalueweb/nextjs-rootlab-final-project'
            target='_blank'
            rel='noopener noreferrer'
            className='text-red-600 font-light md:mr-6 mr-4'
          >
            <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon> Github repo
          </a>
        </li>
      </ul>
    </footer>
  )
}
