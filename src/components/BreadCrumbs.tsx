import { HomeIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

interface BreadcrumbProps {
  title: string
}

export default function BreadCrumbs(props: BreadcrumbProps) {
  const router = useRouter()
  const pages = [
    { name: props.title, href: '#', current: false },
  ]
  return (
    <nav className="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
      <ol role="list" className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center cursor-pointer" onClick={()=>router.back()}>
            {/* <a href="#" className="text-gray-400 hover:text-gray-500"> */}
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            {/* </a> */}
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <p
                onClick={()=>router.refresh()}
                className="ml-4 text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
