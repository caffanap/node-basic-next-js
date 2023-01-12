import { Handle, Position } from "reactflow";

export default function NodeVideo({ data }) {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div className="border border-gray-900 px-4 py-2 rounded-md">
        <div className="text-purple-600 text-center">MEDIA Video : {data.label} </div>
        <video autoPlay loop className="w-64 h-40 object-cover" src={data.source} />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}
