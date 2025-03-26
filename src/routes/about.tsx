import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: Index,
});

const features = [
  {
    title: "eBPF-Powered Performance",
    description:
      "Leverages eBPF to run safely in-kernel with zero context switching. Achieve near line-rate throughput with low latency, even under heavy loads.",
  },
  {
    title: "Layer 3–7 Visibility",
    description:
      "Filter traffic across the full stack—from IP and ports to HTTP methods, DNS queries, and beyond. Deep packet inspection, without the performance hit.",
  },
  {
    title: "Real-Time Observability",
    description:
      "Live metrics, tracing, and audit logs from inside the kernel. Native support for Prometheus, Grafana, and OpenTelemetry.",
  },
  {
    title: "Security by Design",
    description:
      "Memory-safe, sandboxed, and verified by the kernel's BPF verifier. No user-space daemons. Tight integration with LSM and seccomp.",
  },
  {
    title: "Fully Programmable",
    description:
      "Inject custom filters at runtime. Extend with C or Rust. Integrates cleanly with CI/CD, service mesh, or zero-trust architectures.",
  },
];

function Index() {
  return (
    <section className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">eBPF Firewall</h2>
        <p className="text-lg text-gray-300 mb-10">
          A high-performance, deeply programmable firewall powered by eBPF. Built for modern
          cloud-native workloads.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-300 mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
