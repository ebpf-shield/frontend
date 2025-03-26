import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/agents/proccesses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/agents/proccesses/"!</div>
}
