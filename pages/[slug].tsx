import { Page } from 'components/pages/page/Page'
import { getHomePageTitle, getPageBySlug, getSettings } from 'lib/sanity.client'
import type { GetServerSideProps } from 'next'
import { lazy } from 'react'
import { PagePayload, SettingsPayload } from 'types'

interface PageProps {
  page?: PagePayload
  settings?: SettingsPayload
  homePageTitle?: string
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { homePageTitle, settings, page } = props

  return (
    <Page
      homePageTitle={homePageTitle}
      page={page}
      settings={settings}
      preview={false}
    />
  )
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { params = {} } = ctx

  const [settings, page, homePageTitle] = await Promise.all([
    getSettings(),
    getPageBySlug({ slug: params.slug }),
    getHomePageTitle(),
  ])

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
      settings,
      homePageTitle,
    },
  }
}
