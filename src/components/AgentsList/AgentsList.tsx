import { useGetAgentsQuery } from "./queries";

export const AgentsList = () => {
  const { isPending, isError, error, data } = useGetAgentsQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const agents = data.map((agent) => {
    return <div key={agent._id.toString()}>{agent.name}</div>;
  });
  return <div>{agents}</div>;
};
