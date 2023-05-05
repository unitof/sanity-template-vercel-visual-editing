import { HomePage } from 'components/pages/home/HomePage'
import { getHomePage, getSettings } from 'lib/sanity.client'
import { GetServerSideProps } from 'next'
import { HomePagePayload, SettingsPayload } from 'types'

interface PageProps {
  page: HomePagePayload
  settings: SettingsPayload
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function IndexPage(props: PageProps) {
  const { page, settings } = props

  return <HomePage page={page} settings={settings} />
}

const fallbackPage: HomePagePayload = {
  title: '',
  overview: [],
  showcaseProjects: [],
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async () => {
  const [settings, page = fallbackPage] = await Promise.all([
    getSettings(),
    getHomePage(),
  ])

  return {
    props: {
      page,
      settings,
    },
  }
}
