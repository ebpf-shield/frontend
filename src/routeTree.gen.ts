/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as IndexImport } from './routes/index'
import { Route as AuthHomeWithoutOrgImport } from './routes/_auth/home-without-org'
import { Route as authRegisterImport } from './routes/(auth)/register'
import { Route as authLoginImport } from './routes/(auth)/login'
import { Route as AuthOrganizationRouteImport } from './routes/_auth/_organization/route'
import { Route as AuthOrganizationHomeWithOrgImport } from './routes/_auth/_organization/home-with-org'
import { Route as AuthOrganizationDashboardsRouteImport } from './routes/_auth/_organization/dashboards/route'
import { Route as AuthOrganizationAgentsRouteImport } from './routes/_auth/_organization/agents/route'
import { Route as AuthOrganizationDashboardsIndexImport } from './routes/_auth/_organization/dashboards/index'
import { Route as AuthOrganizationAgentsIndexImport } from './routes/_auth/_organization/agents/index'
import { Route as AuthOrganizationAgentsAgentIdImport } from './routes/_auth/_organization/agents/$agentId'
import { Route as AuthOrganizationDashboardsAgentsIndexImport } from './routes/_auth/_organization/dashboards/agents/index'
import { Route as AuthOrganizationAgentsProcessesProcessIdImport } from './routes/_auth/_organization/agents/processes/$processId'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthHomeWithoutOrgRoute = AuthHomeWithoutOrgImport.update({
  id: '/home-without-org',
  path: '/home-without-org',
  getParentRoute: () => AuthRouteRoute,
} as any)

const authRegisterRoute = authRegisterImport.update({
  id: '/(auth)/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  id: '/(auth)/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthOrganizationRouteRoute = AuthOrganizationRouteImport.update({
  id: '/_organization',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthOrganizationHomeWithOrgRoute =
  AuthOrganizationHomeWithOrgImport.update({
    id: '/home-with-org',
    path: '/home-with-org',
    getParentRoute: () => AuthOrganizationRouteRoute,
  } as any)

const AuthOrganizationDashboardsRouteRoute =
  AuthOrganizationDashboardsRouteImport.update({
    id: '/dashboards',
    path: '/dashboards',
    getParentRoute: () => AuthOrganizationRouteRoute,
  } as any)

const AuthOrganizationAgentsRouteRoute =
  AuthOrganizationAgentsRouteImport.update({
    id: '/agents',
    path: '/agents',
    getParentRoute: () => AuthOrganizationRouteRoute,
  } as any)

const AuthOrganizationDashboardsIndexRoute =
  AuthOrganizationDashboardsIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthOrganizationDashboardsRouteRoute,
  } as any)

const AuthOrganizationAgentsIndexRoute =
  AuthOrganizationAgentsIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthOrganizationAgentsRouteRoute,
  } as any)

const AuthOrganizationAgentsAgentIdRoute =
  AuthOrganizationAgentsAgentIdImport.update({
    id: '/$agentId',
    path: '/$agentId',
    getParentRoute: () => AuthOrganizationAgentsRouteRoute,
  } as any)

const AuthOrganizationDashboardsAgentsIndexRoute =
  AuthOrganizationDashboardsAgentsIndexImport.update({
    id: '/agents/',
    path: '/agents/',
    getParentRoute: () => AuthOrganizationDashboardsRouteRoute,
  } as any)

const AuthOrganizationAgentsProcessesProcessIdRoute =
  AuthOrganizationAgentsProcessesProcessIdImport.update({
    id: '/processes/$processId',
    path: '/processes/$processId',
    getParentRoute: () => AuthOrganizationAgentsRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_organization': {
      id: '/_auth/_organization'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthOrganizationRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/(auth)/login': {
      id: '/(auth)/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/register': {
      id: '/(auth)/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof authRegisterImport
      parentRoute: typeof rootRoute
    }
    '/_auth/home-without-org': {
      id: '/_auth/home-without-org'
      path: '/home-without-org'
      fullPath: '/home-without-org'
      preLoaderRoute: typeof AuthHomeWithoutOrgImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/_organization/agents': {
      id: '/_auth/_organization/agents'
      path: '/agents'
      fullPath: '/agents'
      preLoaderRoute: typeof AuthOrganizationAgentsRouteImport
      parentRoute: typeof AuthOrganizationRouteImport
    }
    '/_auth/_organization/dashboards': {
      id: '/_auth/_organization/dashboards'
      path: '/dashboards'
      fullPath: '/dashboards'
      preLoaderRoute: typeof AuthOrganizationDashboardsRouteImport
      parentRoute: typeof AuthOrganizationRouteImport
    }
    '/_auth/_organization/home-with-org': {
      id: '/_auth/_organization/home-with-org'
      path: '/home-with-org'
      fullPath: '/home-with-org'
      preLoaderRoute: typeof AuthOrganizationHomeWithOrgImport
      parentRoute: typeof AuthOrganizationRouteImport
    }
    '/_auth/_organization/agents/$agentId': {
      id: '/_auth/_organization/agents/$agentId'
      path: '/$agentId'
      fullPath: '/agents/$agentId'
      preLoaderRoute: typeof AuthOrganizationAgentsAgentIdImport
      parentRoute: typeof AuthOrganizationAgentsRouteImport
    }
    '/_auth/_organization/agents/': {
      id: '/_auth/_organization/agents/'
      path: '/'
      fullPath: '/agents/'
      preLoaderRoute: typeof AuthOrganizationAgentsIndexImport
      parentRoute: typeof AuthOrganizationAgentsRouteImport
    }
    '/_auth/_organization/dashboards/': {
      id: '/_auth/_organization/dashboards/'
      path: '/'
      fullPath: '/dashboards/'
      preLoaderRoute: typeof AuthOrganizationDashboardsIndexImport
      parentRoute: typeof AuthOrganizationDashboardsRouteImport
    }
    '/_auth/_organization/agents/processes/$processId': {
      id: '/_auth/_organization/agents/processes/$processId'
      path: '/processes/$processId'
      fullPath: '/agents/processes/$processId'
      preLoaderRoute: typeof AuthOrganizationAgentsProcessesProcessIdImport
      parentRoute: typeof AuthOrganizationAgentsRouteImport
    }
    '/_auth/_organization/dashboards/agents/': {
      id: '/_auth/_organization/dashboards/agents/'
      path: '/agents'
      fullPath: '/dashboards/agents'
      preLoaderRoute: typeof AuthOrganizationDashboardsAgentsIndexImport
      parentRoute: typeof AuthOrganizationDashboardsRouteImport
    }
  }
}

// Create and export the route tree

interface AuthOrganizationAgentsRouteRouteChildren {
  AuthOrganizationAgentsAgentIdRoute: typeof AuthOrganizationAgentsAgentIdRoute
  AuthOrganizationAgentsIndexRoute: typeof AuthOrganizationAgentsIndexRoute
  AuthOrganizationAgentsProcessesProcessIdRoute: typeof AuthOrganizationAgentsProcessesProcessIdRoute
}

const AuthOrganizationAgentsRouteRouteChildren: AuthOrganizationAgentsRouteRouteChildren =
  {
    AuthOrganizationAgentsAgentIdRoute: AuthOrganizationAgentsAgentIdRoute,
    AuthOrganizationAgentsIndexRoute: AuthOrganizationAgentsIndexRoute,
    AuthOrganizationAgentsProcessesProcessIdRoute:
      AuthOrganizationAgentsProcessesProcessIdRoute,
  }

const AuthOrganizationAgentsRouteRouteWithChildren =
  AuthOrganizationAgentsRouteRoute._addFileChildren(
    AuthOrganizationAgentsRouteRouteChildren,
  )

interface AuthOrganizationDashboardsRouteRouteChildren {
  AuthOrganizationDashboardsIndexRoute: typeof AuthOrganizationDashboardsIndexRoute
  AuthOrganizationDashboardsAgentsIndexRoute: typeof AuthOrganizationDashboardsAgentsIndexRoute
}

const AuthOrganizationDashboardsRouteRouteChildren: AuthOrganizationDashboardsRouteRouteChildren =
  {
    AuthOrganizationDashboardsIndexRoute: AuthOrganizationDashboardsIndexRoute,
    AuthOrganizationDashboardsAgentsIndexRoute:
      AuthOrganizationDashboardsAgentsIndexRoute,
  }

const AuthOrganizationDashboardsRouteRouteWithChildren =
  AuthOrganizationDashboardsRouteRoute._addFileChildren(
    AuthOrganizationDashboardsRouteRouteChildren,
  )

interface AuthOrganizationRouteRouteChildren {
  AuthOrganizationAgentsRouteRoute: typeof AuthOrganizationAgentsRouteRouteWithChildren
  AuthOrganizationDashboardsRouteRoute: typeof AuthOrganizationDashboardsRouteRouteWithChildren
  AuthOrganizationHomeWithOrgRoute: typeof AuthOrganizationHomeWithOrgRoute
}

const AuthOrganizationRouteRouteChildren: AuthOrganizationRouteRouteChildren = {
  AuthOrganizationAgentsRouteRoute:
    AuthOrganizationAgentsRouteRouteWithChildren,
  AuthOrganizationDashboardsRouteRoute:
    AuthOrganizationDashboardsRouteRouteWithChildren,
  AuthOrganizationHomeWithOrgRoute: AuthOrganizationHomeWithOrgRoute,
}

const AuthOrganizationRouteRouteWithChildren =
  AuthOrganizationRouteRoute._addFileChildren(
    AuthOrganizationRouteRouteChildren,
  )

interface AuthRouteRouteChildren {
  AuthOrganizationRouteRoute: typeof AuthOrganizationRouteRouteWithChildren
  AuthHomeWithoutOrgRoute: typeof AuthHomeWithoutOrgRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthOrganizationRouteRoute: AuthOrganizationRouteRouteWithChildren,
  AuthHomeWithoutOrgRoute: AuthHomeWithoutOrgRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthOrganizationRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/login': typeof authLoginRoute
  '/register': typeof authRegisterRoute
  '/home-without-org': typeof AuthHomeWithoutOrgRoute
  '/agents': typeof AuthOrganizationAgentsRouteRouteWithChildren
  '/dashboards': typeof AuthOrganizationDashboardsRouteRouteWithChildren
  '/home-with-org': typeof AuthOrganizationHomeWithOrgRoute
  '/agents/$agentId': typeof AuthOrganizationAgentsAgentIdRoute
  '/agents/': typeof AuthOrganizationAgentsIndexRoute
  '/dashboards/': typeof AuthOrganizationDashboardsIndexRoute
  '/agents/processes/$processId': typeof AuthOrganizationAgentsProcessesProcessIdRoute
  '/dashboards/agents': typeof AuthOrganizationDashboardsAgentsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthOrganizationRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/login': typeof authLoginRoute
  '/register': typeof authRegisterRoute
  '/home-without-org': typeof AuthHomeWithoutOrgRoute
  '/home-with-org': typeof AuthOrganizationHomeWithOrgRoute
  '/agents/$agentId': typeof AuthOrganizationAgentsAgentIdRoute
  '/agents': typeof AuthOrganizationAgentsIndexRoute
  '/dashboards': typeof AuthOrganizationDashboardsIndexRoute
  '/agents/processes/$processId': typeof AuthOrganizationAgentsProcessesProcessIdRoute
  '/dashboards/agents': typeof AuthOrganizationDashboardsAgentsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/_auth/_organization': typeof AuthOrganizationRouteRouteWithChildren
  '/(auth)/login': typeof authLoginRoute
  '/(auth)/register': typeof authRegisterRoute
  '/_auth/home-without-org': typeof AuthHomeWithoutOrgRoute
  '/_auth/_organization/agents': typeof AuthOrganizationAgentsRouteRouteWithChildren
  '/_auth/_organization/dashboards': typeof AuthOrganizationDashboardsRouteRouteWithChildren
  '/_auth/_organization/home-with-org': typeof AuthOrganizationHomeWithOrgRoute
  '/_auth/_organization/agents/$agentId': typeof AuthOrganizationAgentsAgentIdRoute
  '/_auth/_organization/agents/': typeof AuthOrganizationAgentsIndexRoute
  '/_auth/_organization/dashboards/': typeof AuthOrganizationDashboardsIndexRoute
  '/_auth/_organization/agents/processes/$processId': typeof AuthOrganizationAgentsProcessesProcessIdRoute
  '/_auth/_organization/dashboards/agents/': typeof AuthOrganizationDashboardsAgentsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/about'
    | '/login'
    | '/register'
    | '/home-without-org'
    | '/agents'
    | '/dashboards'
    | '/home-with-org'
    | '/agents/$agentId'
    | '/agents/'
    | '/dashboards/'
    | '/agents/processes/$processId'
    | '/dashboards/agents'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/about'
    | '/login'
    | '/register'
    | '/home-without-org'
    | '/home-with-org'
    | '/agents/$agentId'
    | '/agents'
    | '/dashboards'
    | '/agents/processes/$processId'
    | '/dashboards/agents'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/about'
    | '/_auth/_organization'
    | '/(auth)/login'
    | '/(auth)/register'
    | '/_auth/home-without-org'
    | '/_auth/_organization/agents'
    | '/_auth/_organization/dashboards'
    | '/_auth/_organization/home-with-org'
    | '/_auth/_organization/agents/$agentId'
    | '/_auth/_organization/agents/'
    | '/_auth/_organization/dashboards/'
    | '/_auth/_organization/agents/processes/$processId'
    | '/_auth/_organization/dashboards/agents/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  AboutRoute: typeof AboutRoute
  authLoginRoute: typeof authLoginRoute
  authRegisterRoute: typeof authRegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  AboutRoute: AboutRoute,
  authLoginRoute: authLoginRoute,
  authRegisterRoute: authRegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/about",
        "/(auth)/login",
        "/(auth)/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth/route.tsx",
      "children": [
        "/_auth/_organization",
        "/_auth/home-without-org"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/_auth/_organization": {
      "filePath": "_auth/_organization/route.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_organization/agents",
        "/_auth/_organization/dashboards",
        "/_auth/_organization/home-with-org"
      ]
    },
    "/(auth)/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/(auth)/register": {
      "filePath": "(auth)/register.tsx"
    },
    "/_auth/home-without-org": {
      "filePath": "_auth/home-without-org.tsx",
      "parent": "/_auth"
    },
    "/_auth/_organization/agents": {
      "filePath": "_auth/_organization/agents/route.tsx",
      "parent": "/_auth/_organization",
      "children": [
        "/_auth/_organization/agents/$agentId",
        "/_auth/_organization/agents/",
        "/_auth/_organization/agents/processes/$processId"
      ]
    },
    "/_auth/_organization/dashboards": {
      "filePath": "_auth/_organization/dashboards/route.tsx",
      "parent": "/_auth/_organization",
      "children": [
        "/_auth/_organization/dashboards/",
        "/_auth/_organization/dashboards/agents/"
      ]
    },
    "/_auth/_organization/home-with-org": {
      "filePath": "_auth/_organization/home-with-org.tsx",
      "parent": "/_auth/_organization"
    },
    "/_auth/_organization/agents/$agentId": {
      "filePath": "_auth/_organization/agents/$agentId.tsx",
      "parent": "/_auth/_organization/agents"
    },
    "/_auth/_organization/agents/": {
      "filePath": "_auth/_organization/agents/index.tsx",
      "parent": "/_auth/_organization/agents"
    },
    "/_auth/_organization/dashboards/": {
      "filePath": "_auth/_organization/dashboards/index.tsx",
      "parent": "/_auth/_organization/dashboards"
    },
    "/_auth/_organization/agents/processes/$processId": {
      "filePath": "_auth/_organization/agents/processes/$processId.tsx",
      "parent": "/_auth/_organization/agents"
    },
    "/_auth/_organization/dashboards/agents/": {
      "filePath": "_auth/_organization/dashboards/agents/index.tsx",
      "parent": "/_auth/_organization/dashboards"
    }
  }
}
ROUTE_MANIFEST_END */
