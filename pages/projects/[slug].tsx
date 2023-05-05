import { ProjectPage } from 'components/pages/project/ProjectPage'
import {
  getHomePageTitle,
  getProjectBySlug,
  getSettings,
} from 'lib/sanity.client'
import { GetServerSideProps } from 'next'
import { ProjectPayload, SettingsPayload } from 'types'


interface PageProps {
  project?: ProjectPayload
  settings?: SettingsPayload
  homePageTitle?: string
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { homePageTitle, settings, project, preview, token } = props

  return (
    <ProjectPage
      homePageTitle={homePageTitle}
      project={project}
      settings={settings}
      preview={preview}
    />
  )
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  const token = previewData.token

  const [settings, project, homePageTitle] = await Promise.all([
    getSettings(),
    getProjectBySlug({  slug: params.slug }),
    getHomePageTitle(),
  ])

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
      settings,
      homePageTitle,
      preview,
      token: previewData.token ?? null,
    },
  }
}
