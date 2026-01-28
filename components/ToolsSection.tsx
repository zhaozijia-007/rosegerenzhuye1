import ToolCard from "./ToolCard";
import { AI_TOOLS } from "@/lib/data";

export default function ToolsSection() {
  return (
    <section id="tools" className="py-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">AI 工具箱</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
